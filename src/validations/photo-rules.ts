import { body } from "express-validator";


export const createPhotoRules = [
    body("title")
        .isString().withMessage("Uh-uh. Title has to be a String.").bail()
        .trim().isLength({min: 3, max: 191}).withMessage("I'm guessing it's too short, title has to be 3-191 chars"),

    body("url")
        .isString().withMessage("Noooo... The url has to be a string").bail()
        .trim().isURL().withMessage("The URL must be a valid HTTPS URL"), 
    body("comment")
        .optional().isString().withMessage("Comment has to be a.... string!").bail()
        .trim().isLength({min: 3}).withMessage("Your comment has to be at least 3 chars long, get your writing on!")
]

export const updatePhotoRules = [
    body("title")
        .optional().isString().withMessage("My dude. Title has to be a string. ").bail()
        .trim().isLength({min: 3, max: 191}).withMessage("Title has to be 3-191 chars, try again!"),

    body("url")
        .optional().isString().withMessage("Noooo... The url has to be a string").bail()
        .trim().isURL().withMessage("The URL must be a valid HTTPS URL") , 
        
    body("comment")
        .optional().isString().withMessage("A string this comment must be.").bail()
        .trim().isLength({min: 3}).withMessage("Your comment has to be at least 3 chars long, back you go")   
]

//DUBBELKOLLA KONTROLLEN FÖR ISURL()