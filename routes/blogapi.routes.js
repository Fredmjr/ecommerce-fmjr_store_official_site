import express from "express";
import { sharetestUrl, shareUrl } from "../controllers/blogapi.controller.js";

const router = express.Router();

router.get("/share/:id", shareUrl);
router.get("/share", sharetestUrl);

export default router;
