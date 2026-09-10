import {
  generate_otp_fuc,
  verify_otp_fuc,
} from "../inventory_assets/export_fucs/otp/otp.js";
import usrModel from "../models/user.model.js";
import { single_nodemailer_fuc } from "../services/services_email/nodemailer.js";
import hashpwd from "../system_auth/argon2/argon2.hash.js";
import verifypwd from "../system_auth/argon2/argon2.verfy.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

//sign up user
export const signupusrUrl = async (req, res) => {
  const { eml, pwd, conf_pwd, usr_nm, phn } = req.body;
  try {
    console.log(eml, pwd, conf_pwd, usr_nm, phn);
    //empty email & password, confirm password
    if (
      eml === "" ||
      pwd === "" ||
      conf_pwd === "" ||
      usr_nm === "" ||
      phn === ""
    ) {
      return res.json({
        erMgs: "Fill in all fields!",
      });
    }
    //contact validation
    const trimmed = phn.trim();
    const valid_chars = /^\+?[0-9\s\-\(\)]+$/;
    if (!valid_chars.test(trimmed)) {
      return res.status(400).json({
        erMgs: "Phone number contains invalid characters",
      });
    }
    const digits_only = trimmed.replace(/\D/g, "");
    const valid_phn = digits_only;
    if (digits_only.length < 7 || digits_only.length > 15) {
      return res.json({
        erMgs: "Phone number must contain between 7 and 15 digits.",
      });
    }

    //Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(eml)) {
      return res.json({
        erMgs: "Please enter a valid email address.",
      });
    }

    //Password verification
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};:'",.<>/?~`|])[A-Za-z\d!@#$%^&*()_+\-=[\]{};:'",.<>/?~`|]{8,}$/;
    const passwdVerify = passwordRegex.test(pwd);
    const inputRules = `
        <p class="generic_cntrd_txt_cl"><img src="dist/icons/check.svg" class="generic_fltrd_icn_cl" width="12">At least one lowercase letter.</p>
        <p class="generic_cntrd_txt_cl"><img src="dist/icons/check.svg" class="generic_fltrd_icn_cl" width="12">At least one uppercase letter.</p>
        <p class="generic_cntrd_txt_cl"><img src="dist/icons/check.svg" class="generic_fltrd_icn_cl" width="12">At least one numeric digit.</p>
        <p class="generic_cntrd_txt_cl"><img src="dist/icons/check.svg" class="generic_fltrd_icn_cl" width="12">At least one special character.</p>
        <p class="generic_cntrd_txt_cl"><img src="dist/icons/check.svg" class="generic_fltrd_icn_cl" width="12">No periods and no spaces.</p>
        <p class="generic_cntrd_txt_cl"><img src="dist/icons/check.svg" class="generic_fltrd_icn_cl" width="12">Minimum length of 8 characters.</p>
        `;
    //Password verification
    //1. //Password & confirm password match
    if (pwd !== conf_pwd) {
      console.log(pwd, conf_pwd);
      return res.status(400).json({
        erMgs: "Password & Passowrd Confirmation don't match!",
      });
    }
    //2. Verify password formating
    if (!passwdVerify) {
      return res.status(400).json({
        erMgs: inputRules,
      });
    }

    //Check if user exists
    const accnt_exists = await usrModel.findOne({
      where: {
        eml: eml,
      },
    });
    if (accnt_exists) {
      return res.json({
        erMgs:
          "User with provided credentials exists. If this is your account, login.",
      });
    }
    const hashedpassword = await hashpwd(pwd);
    console.log(hashedpassword);

    const new_usr = await usrModel.create({
      usr_nm: usr_nm,
      phn: valid_phn,
      eml: eml,
      pwd: hashedpassword,
    });
    //1. jwt
    /*     if (new_usr) {
      const data = {
        usr_id: new_usr.dataValues.id,
      };
      const JWT = jwt.sign(data, process.env.SECRET_KEY, {
        expiresIn: "24h",
      });
      return res.json({
        redir: true,
        usr_accnt_jwt_token: JWT,
      });
    } */

    //2. opt
    if (new_usr) {
      const usr_otp = generate_otp_fuc(new_usr.dataValues.id);
      const eml_sent = await single_nodemailer_fuc(
        usr_otp,
        new_usr.dataValues.eml,
      );

      if (!eml_sent) {
        return res.json({
          erMgs: `
               <p>Unable to send code to provided email</p>
    <p>Contact customer support, if issue persists</p>`,
        });
      }
      return res.status(200).render("components/login/login_otp_pg");
    }
  } catch (error) {
    console.log(error);
    const erMgs_div = `
    <p>err_code: 001</p>
    <p>Unable to process request!</p>
    <p>Contact customer support, if issue persists</p>
    `;
    return res.status(400).json({
      erMgs: erMgs_div,
    });
  }
};

//login user
export const lgnusrUrl = async (req, res) => {
  const { eml, pwd } = req.body;
  try {
    //empty email & password
    if (eml === "" || pwd === "") {
      return res.json({
        erMgs: "Fill in all fields!",
      });
    }
    //Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(eml)) {
      return res.json({
        erMgs: "Please enter a valid email address.",
      });
    }

    //Password verification
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};:'",.<>/?~`|])[A-Za-z\d!@#$%^&*()_+\-=[\]{};:'",.<>/?~`|]{8,}$/;
    const passwdVerify = passwordRegex.test(pwd);
    const inputRules = `
        <p class="generic_cntrd_txt_cl"><img src="dist/icons/check.svg" class="generic_fltrd_icn_cl" width="12">At least one lowercase letter.</p>
        <p class="generic_cntrd_txt_cl"><img src="dist/icons/check.svg" class="generic_fltrd_icn_cl" width="12">At least one uppercase letter.</p>
        <p class="generic_cntrd_txt_cl"><img src="dist/icons/check.svg" class="generic_fltrd_icn_cl" width="12">At least one numeric digit.</p>
        <p class="generic_cntrd_txt_cl"><img src="dist/icons/check.svg" class="generic_fltrd_icn_cl" width="12">At least one special character.</p>
        <p class="generic_cntrd_txt_cl"><img src="dist/icons/check.svg" class="generic_fltrd_icn_cl" width="12">No periods and no spaces.</p>
        <p class="generic_cntrd_txt_cl"><img src="dist/icons/check.svg" class="generic_fltrd_icn_cl" width="12">Minimum length of 8 characters.</p>
        `;
    //Password verification
    //1. Verify password formating
    if (!passwdVerify) {
      return res.status(400).json({
        erMgs: inputRules,
      });
    }

    //Check if user exists
    const accnt_exists = await usrModel.findOne({
      where: {
        eml: eml,
      },
    });
    if (!accnt_exists) {
      return res.json({
        erMgs: "No user acccount with provided credentials exists.",
      });
    }

    //compare hashed password with loged password
    const isValid = await verifypwd(accnt_exists.pwd, pwd);
    //incorrect password
    if (!isValid) {
      return res.json({
        erMgs: "Incorrect password, try again.",
      });
    }
    //correct passowrd
    //1.jwt
    /*  if (accnt_exists) {
      const data = {
        usr_id: accnt_exists.dataValues.id,
      };
      const JWT = jwt.sign(data, process.env.SECRET_KEY, {
        expiresIn: "24h",
      });
      return res.json({
        redir: true,
        usr_accnt_jwt_token: JWT,
      });
    } */

    //2. opt
    if (accnt_exists) {
      const usr_otp = generate_otp_fuc(accnt_exists.dataValues.id);
      const eml_sent = await single_nodemailer_fuc(
        usr_otp,
        accnt_exists.dataValues.eml,
      );

      if (!eml_sent) {
        return res.json({
          erMgs: `
               <p>Unable to send code to provided email</p>
    <p>Contact customer support, if issue persists</p>`,
        });
      }
      return res.status(200).render("components/login/login_otp_pg");
    }
  } catch (error) {
    console.log(error);
    const erMgs_div = `
    <p>err_code: 001</p>
    <p>Unable to process request!</p>
    <p>Contact customer support, if issue persists</p>
    `;
    return res.status(400).json({
      erMgs: erMgs_div,
    });
  }
};
//login user
export const lgnusrotpUrl = async (req, res) => {
  const { code, eml } = req.body;
  try {
    console.log(code, eml);

    const usr = await usrModel.findOne({
      where: {
        eml: eml,
      },
    });

    console.log(usr.dataValues.id);

    if (usr) {
      const results = await verify_otp_fuc(usr.dataValues.id, code);
      console.log(results);

      if (results === false) {
        return res.json({
          erMgs: "Incorrect code or code has expired",
        });
      }
      //update user account to active (otherwise will be deleted later)
      //update
      usr.accunt_otp_status = "Active";
      const updated_usr = await usr.save();
      //jwt
      if (updated_usr) {
        const data = {
          usr_id: usr.dataValues.id,
        };
        const JWT = jwt.sign(data, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        return res.json({
          redir: true,
          usr_accnt_jwt_token: JWT,
        });
      }
    }
  } catch (error) {
    console.log(error);
    const erMgs_div = `
    <p>err_code: 001</p>
    <p>Unable to process request!</p>
    <p>Contact customer support, if issue persists</p>
    `;
    return res.status(400).json({
      erMgs: erMgs_div,
    });
  }
};
//forgot password
export const frgotpwdUrl = async (req, res) => {
  const { eml } = req.body;
  try {
    //empty email
    if (eml === "") {
      return res.json({
        erMgs: "Fill in the field!",
      });
    }

    //Check if user exists
    const accnt_exists = await usrModel.findOne({
      where: {
        eml: eml,
      },
    });
    if (!accnt_exists) {
      return res.json({
        erMgs: "No user acccount with provided credentials exists.",
      });
    }

    //opt
    if (accnt_exists) {
      const usr_otp = generate_otp_fuc(accnt_exists.dataValues.id);
      const eml_sent = await single_nodemailer_fuc(
        usr_otp,
        accnt_exists.dataValues.eml,
      );

      if (!eml_sent) {
        return res.json({
          erMgs: `
               <p>Unable to send code to provided email</p>
    <p>Contact customer support, if issue persists</p>`,
        });
      }
      return res.status(200).render("components/login/login_otp_pg_pwd_reset");
    }
  } catch (error) {
    console.log(error);
    const erMgs_div = `
    <p>err_code: 001</p>
    <p>Unable to process request!</p>
    <p>Contact customer support, if issue persists</p>
    `;
    return res.status(400).json({
      erMgs: erMgs_div,
    });
  }
};

//reset user password with otp page
export const lgnusrotpresetpwdpgUrl = async (req, res) => {
  const { code, eml } = req.body;
  try {
    console.log(code, eml);

    const usr = await usrModel.findOne({
      where: {
        eml: eml,
      },
    });

    console.log(usr.dataValues.id);

    if (usr) {
      const results = await verify_otp_fuc(usr.dataValues.id, code);
      console.log(results);

      if (results === false) {
        return res.json({
          erMgs: "Incorrect code or code has expired",
        });
      }
      //reset passsword page
      return res.status(200).render("components/login/login_pwd_reset");
    }
  } catch (error) {
    console.log(error);
    const erMgs_div = `
    <p>err_code: 001</p>
    <p>Unable to process request!</p>
    <p>Contact customer support, if issue persists</p>
    `;
    return res.status(400).json({
      erMgs: erMgs_div,
    });
  }
};

//reset user password with otp actaul reset
export const lgnusrotpresetpwdUrl = async (req, res) => {
  const { pwd, eml } = req.body;
  try {
    console.log(pwd, eml);
    //Password verification
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};:'",.<>/?~`|])[A-Za-z\d!@#$%^&*()_+\-=[\]{};:'",.<>/?~`|]{8,}$/;
    const passwdVerify = passwordRegex.test(pwd);
    const inputRules = `
        <p class="generic_cntrd_txt_cl"><img src="dist/icons/check.svg" class="generic_fltrd_icn_cl" width="12">At least one lowercase letter.</p>
        <p class="generic_cntrd_txt_cl"><img src="dist/icons/check.svg" class="generic_fltrd_icn_cl" width="12">At least one uppercase letter.</p>
        <p class="generic_cntrd_txt_cl"><img src="dist/icons/check.svg" class="generic_fltrd_icn_cl" width="12">At least one numeric digit.</p>
        <p class="generic_cntrd_txt_cl"><img src="dist/icons/check.svg" class="generic_fltrd_icn_cl" width="12">At least one special character.</p>
        <p class="generic_cntrd_txt_cl"><img src="dist/icons/check.svg" class="generic_fltrd_icn_cl" width="12">No periods and no spaces.</p>
        <p class="generic_cntrd_txt_cl"><img src="dist/icons/check.svg" class="generic_fltrd_icn_cl" width="12">Minimum length of 8 characters.</p>
        `;
    //2. Verify password formating
    if (!passwdVerify) {
      return res.status(400).json({
        erMgs: inputRules,
      });
    }
    const hashedpassword = await hashpwd(pwd);
    console.log(hashedpassword);

    const usr = await usrModel.findOne({
      where: {
        eml: eml,
      },
    });

    //update password & account otp status
    if (usr) {
      usr.pwd = hashedpassword;
      usr.accunt_otp_status = "Active";
      const updated_usr = await usr.save();

      //jwt
      const data = {
        usr_id: usr.dataValues.id,
      };
      const JWT = jwt.sign(data, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      //succssful message
      const client_loged_out_mgs = `
          <div id="lggd_out_sctn">
          <div id="lggd_out_sctn_cntnts">
          <div id="frgotpwdpgcntnts_tplogo">
            <img src="assets/logos/fmjr_stores official.png" width="25" alt="">
          </div>
          <p id="frgotpwd_ttl">Password Reset/p>
          <p id="frgotpwd_dscrptn">You have successfully changed your password.</p>
          <br><br>
          <div id="lggd_out_sctn_rtrnhmbtn_pnl">
          <button id="resetpwdpg_sctn_rtrnhmbtn">Return Home</button>
          <button id="resetpwdpg_sctn_accntsbtn">Account</button></div>
          </div>
          </div>
          `;
      if (updated_usr) {
        return res.status(200).json({
          redir: true,
          usr_accnt_jwt_token: JWT,
          reset_mgs: client_loged_out_mgs,
        });
      }
    }

    /*   if (usr) {
      const results = await verify_otp_fuc(usr.dataValues.id, code);
      console.log(results);

      if (results === false) {
        return res.json({
          erMgs: "Incorrect code or code has expired",
        });
      }
      //reset passsword page
      return res.status(200).render("components/login/login_pwd_reset");
    } */
  } catch (error) {
    console.log(error);
    const erMgs_div = `
    <p>err_code: 001</p>
    <p>Unable to process request!</p>
    <p>Contact customer support, if issue persists</p>
    `;
    return res.status(400).json({
      erMgs: erMgs_div,
    });
  }
};
