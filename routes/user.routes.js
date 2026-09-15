import express from "express";
import {
  frgotpwdUrl,
  lgnusrotpresetpwdpgUrl,
  lgnusrotpresetpwdUrl,
  lgnusrotpUrl,
  lgnusrUrl,
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

export default router;
