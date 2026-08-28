import express from "express";
import {
  auhtrbksdatasctnapiUrl,
  blogdataapiUrl,
  brndngflyrsdataapiUrl,
  brndngpstrflyrsindiimgapiUrl,
  chrchflyrsdataapiUrl,
  chrchpstrflyrsindiimgapiUrl,
  clbrstrntflyrsdataapiUrl,
  clbsrstrntpstrflyrsindiimgapiUrl,
  cnrsatnsapiUrl,
  dtmtndataapiUrl,
  gnrlflyrsdataapiUrl,
  gnrlpstrflyrsindiimgapiUrl,
  grphcsdsgndataapiUrl,
  grphcsdsgndatasctnapiUrl,
  prtfloimgsapiUrl,
  prtfloimgsnamesapiUrl,
  rcntpstrflyrsindiimgapiUrl,
  sprtsflyrsdataapiUrl,
  sprtspstrflyrsindiimgapiUrl,
  srchddataapiUrl,
  thmbnlpstrflyrsindiimgapiUrl,
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
router.get("/gnrlpstrflyrsindiimgapi/:id", gnrlpstrflyrsindiimgapiUrl);
router.get("/chrchpstrflyrsindiimgapi/:id", chrchpstrflyrsindiimgapiUrl);
router.get(
  "/clbsrstrntpstrflyrsindiimgapi/:id",
  clbsrstrntpstrflyrsindiimgapiUrl,
);
router.get("/sprtspstrflyrsindiimgapi/:id", sprtspstrflyrsindiimgapiUrl);
router.get("/brndngpstrflyrsindiimgapi/:id", brndngpstrflyrsindiimgapiUrl);
router.get("/thmbnlpstrflyrsindiimgapi/:id", thmbnlpstrflyrsindiimgapiUrl);
router.get("/auhtrbksdatasctnapi", auhtrbksdatasctnapiUrl);

export default router;
