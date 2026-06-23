import express from "express";

import {
  cachdsrvcsUrl,
  hdrdtUrl,
  onetimemgsUrl,
  portflpgUrl,
  wlcmimgUrl,
} from "../controllers/app.controller.js";
const router = express.Router();

router.get("/hdrdt", hdrdtUrl);
router.get("/portflpg", portflpgUrl);
router.get("/wlcmimg", wlcmimgUrl);
router.get("/onetimemgs/:id", onetimemgsUrl);
router.get("/cachdsrvcs", cachdsrvcsUrl);

export default router;
