import { Request, Response } from "express";
import Debug from "debug";
import { getUserbyId } from "../services.ts/user-service";
import { matchedData } from "express-validator";
import { UpdateUser } from "../types/user-types";
import { updateUserProfile } from "../services.ts/profile-service";
import bcrypt from "bcrypt";


const debug = Debug('fed23-api-photo-app - profile-controller');


export const getUserProfile = async (req: Request, res: Response) => {

	if (!req.token) {
		throw new Error("Have you removed your token bad boi?");
	}

    const profile = await getUserbyId(req.token.sub)

    const sanitizedProfile = {
        id: profile?.id,
        email: profile?.email,
        first_name: profile?.first_name,
        last_name: profile?.last_name,
    }
	
	res.send({
		status: "success",
		data: sanitizedProfile,
	});
}

export const updateProfile = async (req: Request, res: Response) => {
    const userIdFromToken = req.token?.sub;
    const paramUserId = Number(req.params.userId);

    if(userIdFromToken !== paramUserId) {
        return res.status(403).send({
            status: "error",
            message: "Hrmhrm! You aren't authorized to update this profile?!"
        })
    }
    
    
	const validatedData = matchedData(req);
    
    let data: UpdateUser = {
        ...validatedData
    };
    
    if(validatedData.password) {
        const hashedAndSaltedPwd = await bcrypt.hash(validatedData.password, Number(process.env.SALT_ROUNDS) || 10);
        debug("plaintext password:", validatedData.password);
        debug("hashed password:", hashedAndSaltedPwd);

        data = {
            ...data,
            password: hashedAndSaltedPwd,
        }
    } else {
        const loggedInUser = await getUserbyId(paramUserId);
        if(loggedInUser){
            data = {
                ...data,
                password: loggedInUser.password,
            }
        }
    }

	try {
		const updatedProfile = await updateUserProfile(paramUserId, data);

        const sanitizedProfile = {
            id: updatedProfile?.id,
            email: updatedProfile?.email,
            first_name: updatedProfile?.first_name,
            last_name: updatedProfile?.last_name,
        }
		res.send({ 
            status: "success", 
            data: sanitizedProfile 
        });

	} catch (err: any) {
		if (err.code === "P2025") {
			res.status(404).send({ 
                status: "error", 
                message: "User Not Found" 
            });
		} else {
			res.status(500).send({ 
                status: "error", 
                message: "Something went wrong when querying the database" 
            });
		}
	}
}