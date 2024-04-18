import {body} from "express-validator"

export const createAlbumRules = [
    body("title")
        .isString().withMessage("Oh no! Your album title has to be a String.").bail()
        .trim().isLength({min: 3, max: 191}).withMessage("No less than 3 chars, no more than 191 chars. Try again."),
]

export const updateAlbumRules = [
    body("title")
        .isString().withMessage("NO. Your album title has to be a string.").bail()
        .trim().isLength({min: 3, max: 191}).withMessage("3-191 chars pls, thank you"),
]