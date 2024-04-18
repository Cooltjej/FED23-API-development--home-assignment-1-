import Debug from "debug";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtAuthenticationData } from "../../types/token-type"

const debug = Debug('fed23-api-photo-app - middleware jwt');

export const validateAccessToken = async (req: Request, res: Response, next: NextFunction) => {
	debug("I am JWT");

	let token: string;

	try {
		token = authHeaderContent(req, "Bearer"); //returnerar en sträng med innehållet i auth headern

	} catch (err) {
		if(err instanceof Error) {
			return res.status(401).send({ 
                status: "fail", 
                message: err.message 
            });
	    }
		    return res.status(401).send({ 
                status: "fail", 
                message: "Unknown authorization error. Helpful, right?" 
            });
	}

	if (!process.env.ACCESS_TOKEN_SECRET) {
		debug("ACCESS_TOKEN_SECRET missing in environment");
		return res.status(500).send({ 
            status: "error", 
            message: "No access token secret defined"
        });
	}
	
	try {

		const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as unknown as JwtAuthenticationData;
        
		req.token = payload;

	} catch (err) {
		debug("JWT Verify failed: %O", err);
	}

	next();
}

type AuthType = "Basic" | "Bearer";

export const authHeaderContent  = (req: Request, expectedType: AuthType) => {

	if (!req.headers.authorization) {
		debug("Authorization header missing");
		throw new Error("You forgot your Authorization header somewhere, it's missing");
	}

	const [authSchema, payload] = req.headers.authorization.split(" ");

	if (authSchema !== expectedType) {
		debug("Authorization schema isn't of the correct type %s", expectedType);
		throw new Error(`Expected ${expectedType} autentication`);
	}

	return payload;
}