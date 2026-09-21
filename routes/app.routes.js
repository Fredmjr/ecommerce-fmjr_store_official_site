import express from "express";

import {
  accntspgUrl,
  adswrkspcpgUrl,
  anncmntpgUrl,
  authrbookspgUrl,
  bsktpgUrl,
  cachdsrvcsUrl,
  chtpgUrl,
  clndrpgUrl,
  clntalpgUrl,
  cookiespgUrl,
  corsclsswrkspcpgUrl,
  dwnldpgUrl,
  evntsschdlspgUrl,
  faqspgUrl,
  fdbkpgUrl,
  fmjrgrphcswrkspcpgUrl,
  frgotpwdpgUrl,
  grphcsflpgUrl,
  hdrdtUrl,
  hirebkspcsctnUrl,
  hlppgUrl,
  issbxpgUrl,
  lgnpgUrl,
  mallpgUrl,
  notfypgUrl,
  onetimemgsUrl,
  portflpgUrl,
  prvcydataUrl,
  prvcypgUrl,
  qkprmtnspgUrl,
  rvwpgUrl,
  sclchnnlUrl,
  sgnuppgUrl,
  trmscndtnspgUrl,
  webdevUrl,
  whyfmjrstrspgUrl,
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
router.get("/clndrpg", clndrpgUrl);
router.get("/evntsschdlspg", evntsschdlspgUrl);
router.get("/faqspg", faqspgUrl);
router.get("/qkprmtnspg", qkprmtnspgUrl);
router.get("/whyfmjrstrspg", whyfmjrstrspgUrl);
router.get("/trmscndtnspg", trmscndtnspgUrl);
router.get("/cookiespg", cookiespgUrl);
router.get("/grphcsflpg", grphcsflpgUrl);
router.get("/authrbookspg", authrbookspgUrl);
router.get("/hirebkspcsctn", hirebkspcsctnUrl);
router.get("/fmjrgrphcswrkspcpg", fmjrgrphcswrkspcpgUrl);
router.get("/corsclsswrkspcpg", corsclsswrkspcpgUrl);
router.get("/mallpg", mallpgUrl);
router.get("/clntalpg", clntalpgUrl);
router.get("/adswrkspcpg", adswrkspcpgUrl);
router.get("/webdev", webdevUrl);
router.get("/sclchnnl", sclchnnlUrl);

export default router;
