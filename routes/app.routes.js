import express from "express";

import { hdrdtUrl, portflpgUrl } from "../controllers/app.controller.js";
const router = express.Router();

router.get("/hdrdt", hdrdtUrl);
router.get("/portflpg", portflpgUrl);

export default router;
