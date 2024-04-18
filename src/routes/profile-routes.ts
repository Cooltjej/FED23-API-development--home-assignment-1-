import express from "express";
import { getUserProfile, updateProfile } from "../controllers/profile-controller";
import { updateProfileRules } from "../validations/user-rules";
import validateRequest from "../middlewares/validate-reqs";
import { validateAccessToken } from "../middlewares/auth/jwt";

const router = express.Router();


// Allt i denna fil ligger efter /profile/



router.get("/", validateAccessToken, getUserProfile);



router.patch("/:userId", validateAccessToken, updateProfileRules, validateRequest, updateProfile);






router.use((req, res) => {
	res.status(404).send({
		message: "Not Found in PROFILE ROUTE",
	});
});

export default router;