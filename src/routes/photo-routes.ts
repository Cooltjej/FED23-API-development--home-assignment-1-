import express from "express";
import { destroy, photoIndex, photoShow, photoStore, photoUpdate } from "../controllers/photo-controller";
import { createPhotoRules, updatePhotoRules } from "../validations/photo-rules";
import validateRequest from "../middlewares/validate-reqs";
import { validateAccessToken } from "../middlewares/auth/jwt";
const router = express.Router();

// Allt i denna fil ligger efter /photos


router.get("/", validateAccessToken, photoIndex);


router.get("/:photoId", validateAccessToken, validateRequest, photoShow)


//create
router.post("/", validateAccessToken, createPhotoRules, validateRequest, photoStore)



router.patch("/:photoId", validateAccessToken, updatePhotoRules, validateRequest, photoUpdate)



router.delete("/:photoId", validateAccessToken, validateRequest, destroy)




router.use((req, res) => {
	res.status(404).send({
		message: "Not Found in PHOTO ROUTE",
	});
});

export default router;