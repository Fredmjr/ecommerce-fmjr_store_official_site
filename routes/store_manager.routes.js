import express from "express";
import {
  accntscrdletsUrl,
  allaccntsUrl,
  autolgnUrl,
  cnfrmlgnusrphrspssUrl,
  dcrptckieUrl,
  dltaccntUrl,
  lgnstrmngrUrl,
  lgnusrphrspssUrl,
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

export default router;
