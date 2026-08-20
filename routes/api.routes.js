import express from "express";
import {
  blogdataapiUrl,
  brndngflyrsdataapiUrl,
  chrchflyrsdataapiUrl,
  clbrstrntflyrsdataapiUrl,
  cnrsatnsapiUrl,
  dtmtndataapiUrl,
  gnrlflyrsdataapiUrl,
  grphcsdsgndataapiUrl,
  grphcsdsgndatasctnapiUrl,
  prtfloimgsapiUrl,
  prtfloimgsnamesapiUrl,
  rcntpstrflyrsindiimgapiUrl,
  sprtsflyrsdataapiUrl,
  srchddataapiUrl,
  thmbnlsflyrsdataapiUrl,
} from "../controllers/api.controller.js";

const router = express.Router();

router.get("/dtmtndataapi", dtmtndataapiUrl);
router.get("/cnrsatnsapi", cnrsatnsapiUrl);
router.get("/prtfloimgsnamesapi", prtfloimgsnamesapiUrl);
router.get("/prtfloimgsapi/:id", prtfloimgsapiUrl);
router.get("/blogdataapi", blogdataapiUrl);
router.post("/srchddataapi", srchddataapiUrl);
router.get("/grphcsdsgndataapi", grphcsdsgndataapiUrl);
router.get("/gnrlflyrsdataapi", gnrlflyrsdataapiUrl);
router.get("/chrchflyrsdataapi", chrchflyrsdataapiUrl);
router.get("/clbrstrntflyrsdataapi", clbrstrntflyrsdataapiUrl);
router.get("/sprtsflyrsdataapi", sprtsflyrsdataapiUrl);
router.get("/brndngflyrsdataapi", brndngflyrsdataapiUrl);
router.get("/thmbnlsflyrsdataapi", thmbnlsflyrsdataapiUrl);
router.get("/grphcsdsgndatasctnapi", grphcsdsgndatasctnapiUrl);
router.get("/rcntpstrflyrsindiimgapi/:id", rcntpstrflyrsindiimgapiUrl);

export default router;
