import express from "express";
import {
  accntscrdletsUrl,
  allaccntsUrl,
  dltaccntUrl,
} from "../controllers/store_manager.controller.js";

const router = express.Router();

router.get("/accntscrdlets", accntscrdletsUrl);
router.get("/allaccnts", allaccntsUrl);
router.delete("/dltaccnt/:id", dltaccntUrl);

export default router;
