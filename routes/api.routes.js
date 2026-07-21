import express from "express";
import {
  cnrsatnsapiUrl,
  dtmtndataapiUrl,
  prtfloimgsapiUrl,
  prtfloimgsnamesapiUrl,
} from "../controllers/api.controller.js";

const router = express.Router();

router.get("/dtmtndataapi", dtmtndataapiUrl);
router.get("/cnrsatnsapi", cnrsatnsapiUrl);
router.get("/prtfloimgsnamesapi", prtfloimgsnamesapiUrl);
router.get("/prtfloimgsapi/:id", prtfloimgsapiUrl);

export default router;
