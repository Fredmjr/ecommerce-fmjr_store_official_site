import express from "express";
import {
  blogdataapiUrl,
  cnrsatnsapiUrl,
  dtmtndataapiUrl,
  prtfloimgsapiUrl,
  prtfloimgsnamesapiUrl,
  srchddataapiUrl,
} from "../controllers/api.controller.js";

const router = express.Router();

router.get("/dtmtndataapi", dtmtndataapiUrl);
router.get("/cnrsatnsapi", cnrsatnsapiUrl);
router.get("/prtfloimgsnamesapi", prtfloimgsnamesapiUrl);
router.get("/prtfloimgsapi/:id", prtfloimgsapiUrl);
router.get("/blogdataapi", blogdataapiUrl);
router.post("/srchddataapi", srchddataapiUrl);

export default router;
