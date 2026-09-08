import express from "express";
import { signupusrUrl } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signupusr", signupusrUrl);

export default router;
