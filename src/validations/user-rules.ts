import { body } from "express-validator";
import { getUserByEmail } from "../services.ts/user-service";

//USER RULES FOR CREATING A NEW USER

export const registerUserRules = [

	body("first_name")
        .isString().withMessage("Surely your first name is not a number. Enter a string pls.").bail()
        .trim().isLength({min: 3, max: 191}).withMessage("I'm really sorry that you have a short name that's under 3 chars long. 'Cause that's what required."),

	body("last_name")
		.isString().withMessage("Surely your last name is not a number. Enter a string pls.").bail()
		.trim().isLength({min: 3, max: 191}).withMessage("I'm really sorry that you have a short name that's under 3 chars long. 'Cause that's what required."),

    body("email")
		.trim().isEmail().withMessage("The email has to be a valid email, come on now.").bail()
		.custom(async (value) => {

			const user = await getUserByEmail(value);
			if (user) {
				throw new Error("Huh. The email already exists. Weird.");
			}
		}),

	body("password")
		.isString().withMessage("Like everything else, password needs to be a string.").bail()
		.trim().isLength({ min: 6 }).withMessage("Password = At least 6 chars, please and thank you!"),   
]

export const loginUserRules = [
    body("email")
	.trim().isEmail().withMessage("The email has to be a valid email, come on now."),

    body("password")
		.isString().withMessage("Like everything else, password needs to be a string.").bail()
		.trim().isLength({ min: 6 }).withMessage("Password has to be at least 6 chars, please make a new, better one"),

]

export const updateProfileRules = [
	body("first_name")
        .optional().isString().withMessage("Surely your first name is not a number. Enter a string pls.").bail()
        .trim().isLength({min: 3, max: 191}).withMessage("I'm really sorry that you have a short name that's under 3 chars long. 'Cause that's what required."),

	body("last_name")
		.optional().isString().withMessage("Surely your last name is not a number. Enter a string pls.").bail()
		.trim().isLength({min: 3, max: 191}).withMessage("I'm really sorry that you have a short name that's under 3 chars long. 'Cause that's what required."),

    body("email")
		.optional().trim().isEmail().withMessage("The email has to be a valid email, come on now.").bail()
		.custom(async (value) => {

			const user = await getUserByEmail(value);
			if (user) {
				throw new Error("Huh. The email already exists. Weird.");
			}
		}),

	body("password")
		.optional().isString().withMessage("Like everything else, password needs to be a string.").bail()
		.trim().isLength({ min: 6 }).withMessage("Password = At least 6 chars, please and thank you!"),
];


