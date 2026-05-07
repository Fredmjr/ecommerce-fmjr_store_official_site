import express from "express";
import {
  apiUrl,
  dwnlappUrl,
  lknumUrl,
  lkUrl,
  lrnmrdataUrl,
  prvcyUrl,
  sggstUrl,
  trmsUrl,
  tstUrl,
  txtdataUrl,
  vrndwnldUrl,
  vrsndataUrl,
} from "../controllers/api.controller.js";

const router = express.Router();

router.get("/eg", apiUrl);
router.get("/lrnmrdata", lrnmrdataUrl);
router.get("/dwnlapp", dwnlappUrl);
router.get("/prvcy", prvcyUrl);
router.get("/trms", trmsUrl);
router.get("/vrsndata", vrsndataUrl);
router.get("/vrndwnld/:id", vrndwnldUrl);
router.get("/sggst", sggstUrl);
router.get("/lk", lkUrl);
router.post("/lknum", lknumUrl);
router.post("/txtdata", txtdataUrl);
router.get("/tst", tstUrl);

export default router;
