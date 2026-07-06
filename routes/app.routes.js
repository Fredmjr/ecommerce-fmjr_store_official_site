import express from "express";

import {
  accntspgUrl,
  anncmntpgUrl,
  bsktpgUrl,
  cachdsrvcsUrl,
  chtpgUrl,
  dwnldpgUrl,
  fdbkpgUrl,
  frgotpwdpgUrl,
  hdrdtUrl,
  hlppgUrl,
  issbxpgUrl,
  lgnpgUrl,
  notfypgUrl,
  onetimemgsUrl,
  portflpgUrl,
  prvcydataUrl,
  prvcypgUrl,
  rvwpgUrl,
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
router.get("/accntspg", accntspgUrl);
router.get("/rvwpg", rvwpgUrl);
router.get("/issbxpg", issbxpgUrl);
router.get("/dwnldpg", dwnldpgUrl);
router.get("/bsktpg", bsktpgUrl);
router.get("/notfypg", notfypgUrl);
router.get("/prvcypg", prvcypgUrl);
router.get("/hlppg", hlppgUrl);
router.get("/fdbkpg", fdbkpgUrl);
router.get("/prvcydata", prvcydataUrl);
router.get("/anncmntpg", anncmntpgUrl);
router.get("/chtpg", chtpgUrl);

export default router;
