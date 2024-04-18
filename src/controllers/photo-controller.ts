//create, update, delete, get all own, get one own
import Debug from "debug";
import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { createPhoto, deletePhoto, getPhotoById, getPhotos, updatePhoto } from "../services.ts/photo-service";
import { CreatePhoto, UpdatePhoto } from "../types/photo-types";

const debug = Debug('fed23-api-photo-app - photo-controller');

export const photoIndex = async (req: Request, res: Response) => {                                                 //ALL PHOTOS
    const userIdFromToken = Number(req.token?.sub);;
                                                                       
    try {
        const photos = await getPhotos(userIdFromToken);  
        res.send({ 
            status: "success", 
            data: photos 
        });
    
    } catch (err) {
        console.error(err);
        res.status(500).send({ 
            status: "error", 
            message: "Oh no. Something went wrong when querying the database" 
        });
    }
}

export const photoShow = async (req: Request, res: Response) => {                                               //SINGLE PHOTOS
	const photoId = Number(req.params.photoId);
    const userIdFromToken = Number(req.token?.sub);    
	try {
        const photo = await getPhotoById(photoId, userIdFromToken);
		res.send({ 
            status: "success", 
            data: photo 
        });

	} catch (err: any) {
		if (err.code === "P2025") {
			res.status(404).send({ 
                status: "error", 
                message: "Photo Not Found" 
            });
		} else {
			debug("Error when trying to query for Photo with ID %d: %O");
			res.status(500).send({ 
                status: "error", 
                message: "Oh snap. Something went wrong when querying the database" 
            });
		}
	}
}

export const photoStore = async (req: Request, res: Response) => {                                              //CREATE A NEW PHOTO
    const validatedData = matchedData(req) as CreatePhoto;
    const userIdFromToken = Number(req.token?.sub);
    
    try {
        const newPhoto = await createPhoto(userIdFromToken, validatedData);
        res.status(201).send({
            status: "success",
            data: newPhoto
        });

    } catch (err) {
        debug("Error when trying to create a new photo: %O");
        res.status(500).send({
            status: "error",
            message: "Well shit. Something went wrong in the database when creating the photo"
        });
    }
}

export const photoUpdate = async (req: Request, res: Response) => {                                             //UPDATE USERS PHOTO
	const photoId = Number(req.params.photoId);
    const userIdFromToken = Number(req.token?.sub);;

    const validatedData = matchedData(req) as UpdatePhoto;
    try {
        const photo = await updatePhoto(photoId, userIdFromToken, validatedData);
		res.status(200).send({ 
            status: "success", 
            data: photo 
        });

	} catch (err: any) {
		if (err.code === "P2025") {
			res.status(404).send({ 
                status: "error", 
                message: "Photo Not Found" 
            });
		} else {
			debug("Error when trying to update photo with ID %d: %O");
			res.status(500).send({ 
                status: "error", 
                message: "Eek! Something went wrong when querying the database" 
            });
		}
	}
}


export const destroy = async (req: Request, res: Response) => {                                                 //DELETE A PHOTO FROM USER
    const photoId = Number(req.params.photoId);
    const userIdFromToken = Number(req.token?.sub);

	try {
		await deletePhoto(photoId, userIdFromToken);
		res.status(200).send({ 
            status: "success", 
            data: {} 
        });

	} catch (err: any) {
		if (err.code === "P2025") {

			res.status(404).send({ 
                status: "error", 
                message: "Photo Not Found" 
            });
		} else {
			debug("Error when trying to delete photo with ID %d: %O", photoId, err);
			res.status(500).send({ 
                status: "error", 
                message: "Something went wrong when querying the database" 
            });
		}
	}
}