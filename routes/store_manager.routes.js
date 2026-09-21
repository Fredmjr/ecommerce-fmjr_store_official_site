import express from "express";
import {
  accntscrdletsUrl,
  allaccntsUrl,
  autolgnUrl,
  cnfrmlgnusrphrspssUrl,
  dcrptckieUrl,
  dltaccntUrl,
  dltindittraccntUrl,
  dltttraccntUrl,
  indittraccntsUrl,
  lgnstrmngrUrl,
  lgnusrphrspssUrl,
  ttraccntsUrl,
} from "../controllers/store_manager.controller.js";

const router = express.Router();

router.get("/accntscrdlets", accntscrdletsUrl);
router.get("/allaccnts", allaccntsUrl);
router.delete("/dltaccnt/:id", dltaccntUrl);
router.post("/lgnstrmngr", lgnstrmngrUrl);
router.post("/lgnusrphrspss", lgnusrphrspssUrl);
router.post("/cnfrmlgnusrphrspss", cnfrmlgnusrphrspssUrl);
router.post("/autolgn", autolgnUrl);
router.post("/dcrptckie", dcrptckieUrl);
router.get("/ttraccnts", ttraccntsUrl);
router.get("/indittraccnts/:id", indittraccntsUrl);
router.post("/dltttraccnt", dltttraccntUrl);
router.post("/dltindittraccnt", dltindittraccntUrl);

export default router;
