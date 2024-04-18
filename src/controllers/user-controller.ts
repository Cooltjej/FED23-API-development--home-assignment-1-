//register, login
import Debug from 'debug';
import { Request, Response } from "express";
import { matchedData, validationResult } from 'express-validator';
import bcrypt from "bcrypt";
import { JwtAuthenticationData, JwtRefreshAuthenticationData } from '../types/token-type';
import jwt from "jsonwebtoken";
import { CreateUser } from '../types/user-types';
import { getUserByEmail, getUserbyId, registerUser } from '../services.ts/user-service';
import { authHeaderContent } from '../middlewares/auth/jwt';


const debug = Debug('fed23-api-photo-app - user-controller');


export const register = async (req: Request, res: Response) => {
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()) {
        res.status(400).send({
            status: "fail, sorry",
            data: validationErrors.array(),
        });

        return;
    } 

    const validatedData = matchedData(req);
    debug("The validatetData: %O", validatedData);

    const hashedAndSaltedPwd = await bcrypt.hash(validatedData.password, Number(process.env.SALT_ROUNDS) || 10);
    debug("plaintext password:", validatedData.password);
    debug("hashed password:", hashedAndSaltedPwd);

    const data = {
        ...validatedData,
        password: hashedAndSaltedPwd,
    } as CreateUser;

    

    try {
        const user = await registerUser(data);
        debug("data: %O", data);
        
        const sanitizedUser = {
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
        }
        
        res.status(201).send({
            status: "success", 
            data: sanitizedUser
        });

    } catch (error) {
        debug("error when trying to create a user: %O", error);
        return res.status(500).send({
            status: "error", 
            message: "could not create a user, try again"
        })
    }
}

interface LoginReqBody {
	email: string
	password: string
}

export const login = async (req: Request, res: Response) => {

	const { email, password } = req.body as LoginReqBody;


	const user = await getUserByEmail(email);
	if (!user) {
		debug("User %s does not exist", email);
		return res.status(401).send({ 
            status: "fail", 
            message: "User does not exist & I can't just let you in." 
        });
	}

	const result = await bcrypt.compare(password, user.password);
	if (!result) {
		debug("User %s password did not match", email);
		return res.status(401).send({ 
            status: "fail", 
            message: "Hmm.. your password doesn't match. Try again!" 
        });
	}

	const payload: JwtAuthenticationData = {
		sub: user.id,
		first_name: user.first_name,
        last_name: user.last_name,
		email: user.email,
	}

	if (!process.env.ACCESS_TOKEN_SECRET) {
		debug("ACCESS_TOKEN_SECRET missing in environment");
		return res.status(500).send({ 
            status: "error", 
            message: "No access token secret defined, please define one. Thank you."
        });
	}
	const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: process.env.ACCESS_TOKEN_LIFETIME || "4h",
	});

	const refreshPayload: JwtRefreshAuthenticationData = {
		sub: user.id,
	}

	if (!process.env.REFRESH_TOKEN_SECRET) {
		debug("REFRESH_TOKEN_SECRET missing in environment");
		return res.status(500).send({ 
            status: "error", 
            message: "No refresh token secret defined, be a doll and define one. Thank you."
        });
	}
	const refresh_token = jwt.sign(refreshPayload, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: process.env.REFRESH_TOKEN_LIFETIME || "1d",
	});

	res.send({
		status: "success",
		data: {
			access_token,
			refresh_token,
		},
	});
}


export const refresh = async (req: Request, res: Response) => {
    let token: string;

    try {
        token = authHeaderContent(req, "Bearer");

    } catch (err) {
        return res.status(401).send({
            status: "fail",
            message: "Excuse you? You're not authorized!"
        });
    }

    if(!process.env.REFRESH_TOKEN_SECRET) {
        debug("REFRESH TOKEN SECRET is missing");
        return res.status(500).send({
            status: "error",
            message: "Hello, refresh token secret? Where are you? Not here, that's for sure. It's missing, please find it."
        });
    }

    try {

        const refreshPayload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET) as unknown as JwtRefreshAuthenticationData;
        debug("RefreshPaylod:", refreshPayload);

        const user = await getUserbyId(refreshPayload.sub);
        if(!user){
            debug("User couldn't be found");
            return res.status(500).send({
                status: "error",
                message: "The user you're looking for is hiding in another castle."
            });
        }

        const payload: JwtAuthenticationData = {
            sub: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name
        }

        if(!process.env.ACCESS_TOKEN_SECRET) {
            debug("ACCESS_TOKEN missing");
            return res.status(500).send({
                status: "error",
                message: "Your access token secret is missing. You lost it... good job!"
            });
        }

        const access_token = jwt.sign( payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFETIME || "10h" } );

        res.send({
            status: "success",
            data: {
                access_token,
            }
        });

    } catch (err) {
        console.log(err)
        debug("Refresh token verification failed");
        return res.status(401).send({
            status: "fail",
            message: "Refresh token verification failed, failed.. failed.... fail....ed.",
        })
    }
}

