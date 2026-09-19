import express from "express";
import {
  crtttraccntUrl,
  frgotpwdUrl,
  lgnusrotpresetpwdpgUrl,
  lgnusrotpresetpwdUrl,
  lgnusrotpUrl,
  lgnusrUrl,
  prflUrl,
  sgnupusrotpUrl,
  signupusrrndrotpUrl,
  signupusrUrl,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signupusr", signupusrUrl);
router.post("/lgnusr", lgnusrUrl);
router.post("/lgnusrotp", lgnusrotpUrl);
router.post("/frgotpwd", frgotpwdUrl);
router.post("/lgnusrotpresetpwdpg", lgnusrotpresetpwdpgUrl);
router.post("/lgnusrotpresetpwd", lgnusrotpresetpwdUrl);
router.post("/signupusrrndrotp", signupusrrndrotpUrl);
router.post("/sgnupusrotp", sgnupusrotpUrl);
router.post("/prfl", prflUrl);
router.post("/crtttraccnt", crtttraccntUrl);

export default router;
