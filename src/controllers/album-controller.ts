//create, update, delete, get all own, get one own
import { Request, Response } from "express";
import { addPhotosToAlbum, createAlbum, deleteAlbum, deletePhotofromAlbum, getAlbumById, getAlbums, updateAlbum } from "../services.ts/album-service";
import Debug from "debug";
import { CreateAlbum, UpdateAlbum } from "../types/album-types";
import { matchedData } from "express-validator";
import { getPhotoById } from "../services.ts/photo-service";


const debug = Debug('fed23-api-photo-app - album-controller');


export const albumIndex = async (req: Request, res: Response) => {
    const userIdFromToken = Number(req.token?.sub);  
    console.log(userIdFromToken) 
                                                                            //all albums
    try {
        const albums = await getAlbums(userIdFromToken);
        res.send({ 
            status: "success", 
            data: albums 
        });
    
    } catch (err) {
        res.status(500).send({ 
            status: "error", 
            message: "!WARNING! Something went wrong when querying the database" 
        });
    }
}

export const albumShow = async (req: Request, res: Response) => {      //single album
	const albumId = Number(req.params.albumId);
    const userIdFromToken = Number(req.token?.sub);
    
    try {
        const album = await getAlbumById(albumId, userIdFromToken);
		res.send({ 
            status: "success", 
            data: album 
        });

	} catch (err: any) {
		if (err.code === "P2025") {
			res.status(404).send({ 
                status: "error", 
                message: "Album not found or it doesn't exist" 
            });
		} else {
			debug("Error when trying to query for Album with ID %d: %O");
			res.status(500).send({ 
                status: "error", 
                message: "Oh naauuurrr... Something went wrong when querying the database" 
            });
		}
	}
}

export const albumStore = async (req: Request, res: Response) => {      //create album
    const validatedData = matchedData(req) as CreateAlbum;
    console.log(validatedData, 'valiod')
    const userIdFromToken = Number(req.token?.sub);

    try {
        const album = await createAlbum(userIdFromToken, validatedData);
        res.status(201).send({
            status: "success",
            data: album,
        });

    } catch (err) {
        console.log(err);
        debug("Error when trying to create a new album: %O");
        res.status(500).send({
            status: "error",
            message: "Damn, something went wrong in the database when creating the album"
        });
    }
}

export const albumUpdate = async (req: Request, res: Response) => {     //update album
	const albumId = Number(req.params.albumId);
    const userIdFromToken = Number(req.token?.sub);
    
    const validatedData = matchedData(req) as UpdateAlbum;
    try {
        const album = await updateAlbum(albumId, userIdFromToken, validatedData);
		res.status(200).send({ 
            status: "success", 
            data: album 
        });

	} catch (err: any) {
		if (err.code === "P2025") {
			res.status(404).send({ 
                status: "error", 
                message: "Album Not Found" 
            });
		} else {
			debug("Error when trying to update Album with ID %d: %O");
			res.status(500).send({ 
                status: "error", 
                message: "Looks like something went wrong when querying the database" 
            });
		}
	}
}

export const addPhotoToAlbum = async (req: Request, res: Response) => {    

    const albumId = Number(req.params.albumId);
    const body = req.body;
    const photoId = Array.isArray(body) ? req.body : [req.body];
    const userIdFromToken = Number(req.token?.sub);

    
    try {
        for (let index = 0; index < photoId.length; index++) {
            const photo = photoId[index];
            await getPhotoById(photo.id, userIdFromToken)
        }

        await addPhotosToAlbum(photoId, albumId, userIdFromToken);
        res.status(201).send({ 
            status: "success", 
            data: null 
        });
    
        } catch (err: any) {
            if (err.code === "P2025") {
                res.status(404).send({ 
                    status: "error", 
                    message: "Photo or Album Not Found" 
                });
            } else {
                debug("Error when trying to add Album %o to Photo with ID %d: %O", req.body, photoId, err);
                res.status(500).send({ 
                    status: "error", 
                    message: "Something went wrong when querying the database" 
                });
            }
        }
}

export const deleteSinglePhotoFromAlbum = async (req: Request, res: Response) => {              //delete single photo from album
	const photoId = Number(req.params.photoId);
	const albumId = Number(req.params.albumId);
    const userIdFromToken = Number(req.token?.sub);

	try {
		await deletePhotofromAlbum(photoId, albumId, userIdFromToken);
		res.status(200).send({ 
            status: "success", 
            data: null 
        });

	} catch (err: any) {
		if (err.code === "P2025") {

			res.status(404).send({ 
                status: "error", 
                message: "Photo Not Found" 
            });
		} else {
			debug("Error when trying to remove Photo %d from Album with ID %d: %O", albumId, photoId, err);
			res.status(500).send({ 
                status: "error", 
                message: "Something went wrong when querying the database" 
            });
		}
	}
}

export const deleteEntireAlbum = async (req: Request, res: Response) => {               //delete entire album
	const albumId = Number(req.params.albumId);
    const userIdFromToken = Number(req.token?.sub);

	try {
		await deleteAlbum(albumId, userIdFromToken);
		res.send({ 
            status: "success", 
            data: null 
        });

	} catch (err: any) {
		if (err.code === "P2025") {
			res.status(404).send({ 
                status: "error", 
                message: "Album Not Found" });
		} else {
			res.status(500).send({ 
                status: "error", 
                message: "Something went wrong when querying the database" });
		}
	}
}