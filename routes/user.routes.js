import express from "express";
import {
  frgotpwdUrl,
  lgnusrotpresetpwdpgUrl,
  lgnusrotpresetpwdUrl,
  lgnusrotpUrl,
  lgnusrUrl,
  signupusrUrl,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signupusr", signupusrUrl);
router.post("/lgnusr", lgnusrUrl);
router.post("/lgnusrotp", lgnusrotpUrl);
router.post("/frgotpwd", frgotpwdUrl);
router.post("/lgnusrotpresetpwdpg", lgnusrotpresetpwdpgUrl);
router.post("/lgnusrotpresetpwd", lgnusrotpresetpwdUrl);

export default router;
