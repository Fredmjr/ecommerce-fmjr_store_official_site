import express from "express";
import { dtmtndataapiUrl } from "../controllers/api.controller.js";

const router = express.Router();

router.get("/dtmtndataapi", dtmtndataapiUrl);

export default router;
