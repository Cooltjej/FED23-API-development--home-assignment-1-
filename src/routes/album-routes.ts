import express from "express";
import { addPhotoToAlbum, albumIndex, albumShow, albumStore, albumUpdate, deleteEntireAlbum, deleteSinglePhotoFromAlbum } from "../controllers/album-controller";
import validateRequest from "../middlewares/validate-reqs";
import { createAlbumRules, updateAlbumRules } from "../validations/album-rules";
import { validateAccessToken } from "../middlewares/auth/jwt";



const router = express.Router();

// Allt i denna fil ligger efter /albums

router.get("/", validateAccessToken, albumIndex);                                    					//get all albums


router.get("/:albumId", validateAccessToken, validateRequest, albumShow)  								//get an album
                            													

router.post("/", validateAccessToken, createAlbumRules, validateRequest, albumStore, )                  //create an album


router.patch("/:albumId", validateAccessToken, updateAlbumRules, validateRequest, albumUpdate, )        //update an album


router.post("/:albumId/photos", validateAccessToken, validateRequest, addPhotoToAlbum)                   //add photo(s) to album


router.delete("/:albumId/photos/:photoId", validateAccessToken, validateRequest, deleteSinglePhotoFromAlbum)              //delete a single photo from album


router.delete("/:albumId", validateAccessToken, validateRequest, deleteEntireAlbum)                                       //delete entire album




router.use((req, res) => {

	res.status(404).send({
		message: "Not Found in ALBUM ROUTE",
	});
});

export default router;