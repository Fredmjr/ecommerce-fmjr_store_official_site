import express from "express";

import { hdrdtUrl } from "../controllers/app.controller.js";
const router = express.Router();

router.get("/hdrdt", hdrdtUrl);

export default router;
