import express from "express";
import { shareUrl } from "../controllers/blogapi.controller.js";

const router = express.Router();

router.get("/share/:id", shareUrl);

export default router;
