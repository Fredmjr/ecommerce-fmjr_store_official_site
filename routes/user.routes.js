import express from "express";
import {
  lgnusrotpUrl,
  lgnusrUrl,
  signupusrUrl,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signupusr", signupusrUrl);
router.post("/lgnusr", lgnusrUrl);
router.post("/lgnusrotp", lgnusrotpUrl);

export default router;
