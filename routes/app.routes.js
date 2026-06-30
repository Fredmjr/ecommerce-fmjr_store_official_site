import express from "express";

import {
  cachdsrvcsUrl,
  frgotpwdpgUrl,
  hdrdtUrl,
  lgnpgUrl,
  onetimemgsUrl,
  portflpgUrl,
  sgnuppgUrl,
  wlcmimgUrl,
} from "../controllers/app.controller.js";
const router = express.Router();

router.get("/hdrdt", hdrdtUrl);
router.get("/portflpg", portflpgUrl);
router.get("/wlcmimg", wlcmimgUrl);
router.get("/onetimemgs/:id", onetimemgsUrl);
router.get("/cachdsrvcs", cachdsrvcsUrl);
router.get("/sgnuppg", sgnuppgUrl);
router.get("/lgnpg", lgnpgUrl);
router.get("/frgotpwdpg", frgotpwdpgUrl);

export default router;
