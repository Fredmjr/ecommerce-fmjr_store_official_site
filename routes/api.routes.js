import express from "express";
import {
  cnrsatnsapiUrl,
  dtmtndataapiUrl,
} from "../controllers/api.controller.js";

const router = express.Router();

router.get("/dtmtndataapi", dtmtndataapiUrl);
router.get("/cnrsatnsapi", cnrsatnsapiUrl);

export default router;
