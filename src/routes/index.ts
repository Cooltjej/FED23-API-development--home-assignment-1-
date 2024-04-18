/**
 * Main application routes
 */
import express from "express";
import profileRoutes from "./profile-routes";
import photoRoutes from "./photo-routes";
import albumRoutes from "./album-routes";
import { loginUserRules, registerUserRules } from "../validations/user-rules";
import { login, refresh, register } from "../controllers/user-controller";
import { validateAccessToken } from "../middlewares/auth/jwt";
import validateRequest from "../middlewares/validate-reqs";

const router = express.Router();

// Här börjar alla routes

//johans index-get
router.get("/", (req, res) => {
	res.send({
		message: "og index",
	});
});


router.post("/register", registerUserRules, register)

router.post("/login", loginUserRules, login)

router.post("/refresh", validateAccessToken, refresh)

router.use("/profile", validateAccessToken, profileRoutes);

router.use("/photos", validateAccessToken, validateRequest, photoRoutes)

router.use("/albums", validateAccessToken, validateRequest, albumRoutes)



router.use((req, res) => {

	res.status(404).send({
		message: "Not Found in INDEX ROUTE",
	});
});

export default router;
