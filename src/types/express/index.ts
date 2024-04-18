import { User } from "@prisma/client";
import { JwtAuthenticationData } from "../token-type";

declare global {
	namespace Express {
		export interface Request {
			token?: JwtAuthenticationData
			user?: User
		}
	}
}

