import {
  generate_otp_fuc,
  verify_otp_fuc,
} from "../inventory_assets/export_fucs/otp/otp.js";
import { decryptJWT } from "../middleware/jwe/decrypt.js";
import { encryptJWT } from "../middleware/jwe/encrypt.js";
import usrModel from "../models/user.model.js";
import { single_nodemailer_fuc } from "../services/services_email/nodemailer.js";
import hashpwd from "../system_auth/argon2/argon2.hash.js";
import verifypwd from "../system_auth/argon2/argon2.verfy.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import ttr_usrModel from "../models/tutor_user.model.js";
import Busboy from "busboy";
import { sharp_webp_single_img } from "../inventory/sharp/sharp_indi_img.js";
import { ttr_usr_saveJsonlfile_fuc } from "../inventory_assets/data/tutor_usr_jsonl/tutor_usr.js";
import sequelize from "../config/db.js";

//sign up user - on account creation only email otp verification
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

    //opt

    const uuid = uuidv4();
    const usr_otp = generate_otp_fuc(uuid);
    const eml_sent = await single_nodemailer_fuc(usr_otp, eml);

    if (!eml_sent) {
      return res.json({
        erMgs: `
           <p>Unable to send code to provided email</p>
            <p>Contact customer support, if issue persists</p>`,
      });
    }

    return res.status(200).json({
      usr_id: uuid,
      dir_url: "components/signup/signup_otp_pg",
    });
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

//sign up user - redir to otp page based on payload file directory
export const signupusrrndrotpUrl = async (req, res) => {
  const { dir_url } = req.body;
  try {
    return res.status(200).render(dir_url);
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

//sign up user - veryfy otp & create user account
export const sgnupusrotpUrl = async (req, res) => {
  const { code, usr_sgn_up_obj } = req.body;
  try {
    console.log(code, usr_sgn_up_obj);

    if (!usr_sgn_up_obj || Object.keys(usr_sgn_up_obj).length === 0) {
      return res.status(400).json({
        erMgs: "Unable to complete user account registration",
      });
    }

    console.log("usriddddddddddddddddddddddddddd", usr_sgn_up_obj.usr_id);
    const results = await verify_otp_fuc(usr_sgn_up_obj.usr_id, code);
    console.log(results);

    if (!results || results === false) {
      return res.status(400).json({
        erMgs: "Incorrect code or code has expired",
      });
    }
    //create account
    const hashedpassword = await hashpwd(usr_sgn_up_obj.pwd);
    console.log(hashedpassword);

    const new_usr = await usrModel.create({
      usr_nm: usr_sgn_up_obj.usr_nm,
      phn: usr_sgn_up_obj.phn,
      eml: usr_sgn_up_obj.eml,
      pwd: hashedpassword,
      accunt_otp_status: "Active",
    });
    //failed registration
    if (!new_usr) {
      return res.status(400).json({
        erMgs: "Unable to complete user account registration",
      });
    }

    //jwe
    const token = {
      ky: usr_sgn_up_obj.usr_id,
    };
    const secretKey = Buffer.from(process.env.SECRETHEX, "hex");
    const usr_jwe = await encryptJWT(token, secretKey);

    //signup success mgs
    const cmpltd_sgndup_mgs = `
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

    return res.json({
      redir: true,
      usr_accnt_jwt_token: usr_jwe,
      cmpltd_sgndup_mgs: cmpltd_sgndup_mgs,
    });
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
      /*   usr.accunt_otp_status = "Active";
      const updated_usr = await usr.save(); */
      //jwt
      /*       if (updated_usr) {
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
      } */

      //jwe
      const token = {
        ky: usr.dataValues.id,
      };
      const secretKey = Buffer.from(process.env.SECRETHEX, "hex");
      const usr_jwe = await encryptJWT(token, secretKey);
      return res.status(200).json({
        redir: true,
        usr_accnt_jwt_token: usr_jwe,
      });
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
      /* usr.accunt_otp_status = "Active"; */
      const updated_usr = await usr.save();

      //jwt
      /*       const data = {
        usr_id: usr.dataValues.id,
      };
      const JWT = jwt.sign(data, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
 */
      //jwe
      const token = {
        ky: usr.dataValues.id,
      };
      const secretKey = Buffer.from(process.env.SECRETHEX, "hex");
      const usr_jwe = await encryptJWT(token, secretKey);

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
          usr_accnt_jwt_token: usr_jwe,
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

//reset user password with otp page
export const prflUrl = async (req, res) => {
  const { c } = req.body;
  try {
    console.log("cccccccccccccccccccccccccc: ", c);

    const secretKey = Buffer.from(process.env.SECRETHEX, "hex");
    const d_c = await decryptJWT(c, secretKey);

    console.log(d_c);

    const usr_accnt = await usrModel.findOne({
      where: {
        id: d_c.payload.ky,
      },
    });

    if (!usr_accnt || usr_accnt === "") {
      return res.status(400).json({
        erMgs: "Currently unable to fetch user account details.",
      });
    }

    const tmp = `

     <div id="accntspgcntnts_accntdtls_info">
       <p class="accntspgcntnts_accntdtls_info_ttlcl">Account Username</p>
       <p class="accntspgcntnts_accntdtls_info_dscrptncl">${usr_accnt.dataValues.usr_nm}</p>
       <p class="accntspgcntnts_accntdtls_info_ttlcl">Account Email Address</p>
       <p class="accntspgcntnts_accntdtls_info_dscrptncl">${usr_accnt.dataValues.eml}</p>
       <p class="accntspgcntnts_accntdtls_info_ttlcl">Account Contact Line 1</p>
       <p class="accntspgcntnts_accntdtls_info_dscrptncl">${usr_accnt.dataValues.phn}</p>
       </div>

      `;

    return res.status(200).json({
      usr_dtls_tmp: tmp,
    });
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

//create tutor account - formdata- optional 2
export const crtttraccntUrl = async (req, res) => {
  const busboy = Busboy({ headers: req.headers });
  const fields = {};
  let imageBuffer = null;

  try {
    busboy.on("field", (key, val) => {
      fields[key] = val;
    });

    busboy.on("file", (fieldname, fileStream) => {
      const chunks = [];
      fileStream.on("data", (data) => chunks.push(data));
      fileStream.on("end", () => {
        imageBuffer = Buffer.concat(chunks);
      });
    });

    busboy.on("finish", async () => {
      //1.text
      //empy field
      if (
        fields.ttr_usr_nm === "" ||
        fields.ttr_usr_cntct_1 === "" ||
        fields.ttr_usr_mblsrvcs_nm === "" ||
        fields.ttr_usr_mblsrvcs_phn === "" ||
        fields.ttr_usr_dscrptn === ""
      ) {
        return res.status(200).json({
          erMgs: "Some required fields are empty",
        });
      }
      //empty operator
      console.log(
        "opetrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
        fields.mbl_oprtr,
      );
      if (
        !fields.mbl_oprtr ||
        fields.mbl_oprtr === "" ||
        fields.mbl_oprtr === "undefined"
      ) {
        return res.status(200).json({
          erMgs: "Mobile service operator not selected",
        });
      }
      //contact validation x3
      const valid_eml_fuc = (e) => {
        const trimmed = e.trim(e);
        const valid_chars = /^\+?[0-9\s\-\(\)]+$/;
        if (!valid_chars.test(trimmed)) {
          return res.status(400).json({
            erMgs: "Phone number contains invalid characters",
          });
        }
        const digits_only = trimmed.replace(/\D/g, "");
        if (digits_only.length < 7 || digits_only.length > 15) {
          return res.json({
            erMgs: "Phone number must contain between 7 and 15 digits.",
          });
        }
      };
      if (fields.ttr_usr_cntct_1) {
        valid_eml_fuc(fields.ttr_usr_cntct_1);
      }
      if (fields.ttr_usr_cntct_2) {
        valid_eml_fuc(fields.ttr_usr_cntct_2);
      }
      if (fields.ttr_usr_mblsrvcs_phn) {
        valid_eml_fuc(fields.ttr_usr_mblsrvcs_phn);
      }

      //2. img
      if (
        !imageBuffer ||
        !Buffer.isBuffer(imageBuffer) ||
        imageBuffer.length === 0
      ) {
        return res.status(400).json({
          erMgs: "Profile image not selected, select one",
        });
      }
      const img_path = await sharp_webp_single_img(
        imageBuffer,
        "public/dist/imgs/navbar/user_imgs",
      );
      if (!img_path) {
        return res.status(400).json({
          erMgs: "Unable to complete account details submission",
        });
      }
      //3. save descrption
      const ttr_usr_dscrptn_id_uuid = uuidv4();
      console.log(
        "ssssssssssssssssssssssssssssssssssssssssss",
        ttr_usr_dscrptn_id_uuid,
      );
      console.log(
        "fields.ttr_usr_dscrptnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",
        fields.ttr_usr_dscrptn,
      );

      const save_drscrption = ttr_usr_saveJsonlfile_fuc(
        fields.ttr_usr_dscrptn,
        ttr_usr_dscrptn_id_uuid,
      );
      if (!save_drscrption) {
        return res.status(400).json({
          erMgs: "Unable to complete account details submission",
        });
      }

      //4. save to db & send response
      //write to db
      const secretKey = Buffer.from(process.env.SECRETHEX, "hex");
      const d_c = await decryptJWT(fields.usr_accnt_jwt_token, secretKey);
      const new_usr = await ttr_usrModel.create({
        //required
        ttr_usr_nm: fields.ttr_usr_nm,
        associated_usr_eml_id: d_c.payload.ky,
        ttr_usr_cntct_1: fields.ttr_usr_cntct_1,
        ttr_usr_mblsrvcs_nm: fields.ttr_usr_mblsrvcs_nm,
        ttr_usr_mblsrvcs_phn: fields.ttr_usr_mblsrvcs_phn,
        mbl_oprtr: fields.mbl_oprtr,

        //optional
        ttr_usr_website: fields.ttr_usr_website || "unlisted",
        ttr_usr_fb_hndl: fields.ttr_usr_fb_hndl || "unlisted",
        ttr_usr_instrm_hndl: fields.ttr_usr_instrm_hndl || "unlisted",
        ttr_usr_tiktok_hndl: fields.ttr_usr_tiktok_hndl || "unlisted",
        ttr_usr_bhnc_hndl: fields.ttr_usr_bhnc_hndl || "unlisted",
        ttr_usr_cntct_2: fields.ttr_usr_cntct_2 || "unlisted",
        ttr_usr_prflimg_path: img_path,
        ttr_usr_dscrptn_id: ttr_usr_dscrptn_id_uuid,
      });

      if (!new_usr) {
        return res.json({
          erMgs: "Unable to complete account details submission",
        });
      }
      //cookie for tracking pedning account
      //send
      const tmp = `
    <div id="lggd_out_sctn">
     <div id="lggd_out_sctn_cntnts">
    <div id="frgotpwdpgcntnts_tplogo">
      <img src="assets/logos/fmjr_stores official.png" width="25" alt="">
    </div>
    <p id="frgotpwd_ttl">Tutor Account Registration</p>
    <p id="frgotpwd_dscrptn">Submitted tutor account account is under review. Response to be sent through store messages or email address.</p>
    <br><br>
    <div id="lggd_out_sctn_rtrnhmbtn_pnl"><button id="lggd_out_sctn_rtrnhmbtn">Return Home</button></div>
    </div>
    </div>
    `;
      return res.status(200).json({
        accnt_sttus: true,
        accnt_sttus_mgs: tmp,
      });
    });

    req.pipe(busboy);
  } catch (error) {
    console.log(error.message);
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

//create tutor account - formdata - optional 1
/* export const crtttraccntUrl = async (req, res) => {
  const busboy = Busboy({ headers: req.headers });
  const fields = {};
  let imageBuffer = null;

  try {
    busboy.on("field", (key, val) => {
      fields[key] = val;
    });

    busboy.on("file", (fieldname, fileStream) => {
      const chunks = [];
      fileStream.on("data", (data) => chunks.push(data));
      fileStream.on("end", () => {
        imageBuffer = Buffer.concat(chunks);
      });
    });

    busboy.on("finish", async () => {
      //1.text
      //cookie - checking if account creation is pending
      if (
        fields.ttr_crtd_token_client &&
        fields.ttr_crtd_token_client === null
      ) {
        console.log(
          "fields.ttr_crtd_token_clientttttttttttttttttttttttttttttttttt: ",
          fields.ttr_crtd_token_client,
        );
        const secretKey = Buffer.from(process.env.SECRETHEX, "hex");
        const d_c = await decryptJWT(fields.ttr_crtd_token_client, secretKey);
        const cookie_tmp = `
        <div id="lggd_out_sctn">
        <div id="lggd_out_sctn_cntnts">
        <div id="frgotpwdpgcntnts_tplogo">
          <img src="assets/logos/fmjr_stores official.png" width="25" alt="">
        </div>
        <p id="frgotpwd_ttl">Tutor Account Status</p>
        <p id="frgotpwd_dscrptn">You already submitted an account thats under review. We will get back to you once review is completed.</p>
        <br><br>
        <div id="lggd_out_sctn_rtrnhmbtn_pnl"><button id="lggd_out_sctn_rtrnhmbtn">Return Home</button></div>
        </div>
        </div>
        `;
        if (d_c) {
          return res.status(200).json({
            erMgs: cookie_tmp,
          });
        }
      }

      //check exisitng user
      await sequelize.sync();
      const exits_usr = await ttr_usrModel.findOne({
        where: { ttr_usr_eml: fields.ttr_usr_eml },
      });
      if (exits_usr) {
        return res.status(400).json({
          erMgs: "User with provided credentials exists",
        });
      }
      //empy field
      if (
        fields.ttr_usr_nm === "" ||
        fields.ttr_usr_eml === "" ||
        fields.ttr_usr_cntct_1 === "" ||
        fields.ttr_usr_mblsrvcs_nm === "" ||
        fields.ttr_usr_mblsrvcs_phn === "" ||
        fields.ttr_usr_dscrptn === ""
      ) {
        return res.status(200).json({
          erMgs: "Some required fields are empty",
        });
      }
      //empty operator
      console.log(
        "opetrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
        fields.mbl_oprtr,
      );
      if (
        !fields.mbl_oprtr ||
        fields.mbl_oprtr === "" ||
        fields.mbl_oprtr === "undefined"
      ) {
        return res.status(200).json({
          erMgs: "Mobile service operator not selected",
        });
      }
      //Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(fields.ttr_usr_eml)) {
        return res.json({
          erMgs: "Please enter a valid email address.",
        });
      }
      //contact validation x3
      const valid_eml_fuc = (e) => {
        const trimmed = e.trim(e);
        const valid_chars = /^\+?[0-9\s\-\(\)]+$/;
        if (!valid_chars.test(trimmed)) {
          return res.status(400).json({
            erMgs: "Phone number contains invalid characters",
          });
        }
        const digits_only = trimmed.replace(/\D/g, "");
        if (digits_only.length < 7 || digits_only.length > 15) {
          return res.json({
            erMgs: "Phone number must contain between 7 and 15 digits.",
          });
        }
      };
      if (fields.ttr_usr_cntct_1) {
        valid_eml_fuc(fields.ttr_usr_cntct_1);
      }
      if (fields.ttr_usr_cntct_2) {
        valid_eml_fuc(fields.ttr_usr_cntct_2);
      }
      if (fields.ttr_usr_mblsrvcs_phn) {
        valid_eml_fuc(fields.ttr_usr_mblsrvcs_phn);
      }

      //2. img
      if (
        !imageBuffer ||
        !Buffer.isBuffer(imageBuffer) ||
        imageBuffer.length === 0
      ) {
        return res.status(400).json({
          erMgs: "Profile image not selected, select one",
        });
      }
      const img_path = await sharp_webp_single_img(
        imageBuffer,
        "public/dist/imgs/navbar/user_imgs",
      );
      if (!img_path) {
        return res.status(400).json({
          erMgs: "Unable to complete account details submission",
        });
      }
      //3. save descrption
      const ttr_usr_dscrptn_id_uuid = uuidv4();
      console.log(
        "ssssssssssssssssssssssssssssssssssssssssss",
        ttr_usr_dscrptn_id_uuid,
      );
      console.log(
        "fields.ttr_usr_dscrptnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",
        fields.ttr_usr_dscrptn,
      );

      const save_drscrption = ttr_usr_saveJsonlfile_fuc(
        fields.ttr_usr_dscrptn,
        ttr_usr_dscrptn_id_uuid,
      );
      if (!save_drscrption) {
        return res.status(400).json({
          erMgs: "Unable to complete account details submission",
        });
      }

      //4. save to db & send response
      //save
      //write to db
      const new_usr = await ttr_usrModel.create({
        //required
        ttr_usr_nm: fields.ttr_usr_nm,
        ttr_usr_eml: fields.ttr_usr_eml,
        ttr_usr_cntct_1: fields.ttr_usr_cntct_1,
        ttr_usr_mblsrvcs_nm: fields.ttr_usr_mblsrvcs_nm,
        ttr_usr_mblsrvcs_phn: fields.ttr_usr_mblsrvcs_phn,
        mbl_oprtr: fields.mbl_oprtr,

        //optional
        ttr_usr_website: fields.ttr_usr_website || "unlisted",
        ttr_usr_fb_hndl: fields.ttr_usr_fb_hndl || "unlisted",
        ttr_usr_instrm_hndl: fields.ttr_usr_instrm_hndl || "unlisted",
        ttr_usr_tiktok_hndl: fields.ttr_usr_tiktok_hndl || "unlisted",
        ttr_usr_bhnc_hndl: fields.ttr_usr_bhnc_hndl || "unlisted",
        ttr_usr_cntct_2: fields.ttr_usr_cntct_2 || "unlisted",
        ttr_usr_prflimg_path: img_path,
        ttr_usr_dscrptn_id: ttr_usr_dscrptn_id_uuid,
      });

      if (!new_usr) {
        return res.json({
          erMgs: "Unable to complete account details submission",
        });
      }
      //cookie for tracking pedning account

      //jwe
      const token = {
        ky: new_usr.dataValues.id,
      };
      const secretKey = Buffer.from(process.env.SECRETHEX, "hex");
      const usr_jwe = await encryptJWT(token, secretKey);

      //send
      const tmp = `
    <div id="lggd_out_sctn">
     <div id="lggd_out_sctn_cntnts">
    <div id="frgotpwdpgcntnts_tplogo">
      <img src="assets/logos/fmjr_stores official.png" width="25" alt="">
    </div>
    <p id="frgotpwd_ttl">Tutor Account Registration</p>
    <p id="frgotpwd_dscrptn">Submitted tutor account account is under review. Response to be sent through store messages or email address.</p>
    <br><br>
    <div id="lggd_out_sctn_rtrnhmbtn_pnl"><button id="lggd_out_sctn_rtrnhmbtn">Return Home</button></div>
    </div>
    </div>
    `;
      return res.status(200).json({
        accnt_sttus: true,
        accnt_sttus_mgs: tmp,
        ttr_crtd_token: usr_jwe,
      });
    });

    req.pipe(busboy);
  } catch (error) {
    console.log(error.message);
    const erMgs_div = `
    <p>err_code: 001</p>
    <p>Unable to process request!</p>
    <p>Contact customer support, if issue persists</p>
    `;
    return res.status(400).json({
      erMgs: erMgs_div,
    });
  }
}; */

//create tutor account - normal
/*
export const crtttraccntUrl = async (req, res) => {
  const p_data = req.body;
  try {
    //empy field
    if (
      p_data.ttr_usr_nm === "" ||
      p_data.ttr_usr_eml === "" ||
      p_data.ttr_usr_cntct_1 === "" ||
      p_data.ttr_usr_mblsrvcs_nm === "" ||
      p_data.ttr_usr_mblsrvcs_phn === ""
    ) {
      return res.status(200).json({
        erMgs: "Some required fields are empty",
      });
    }
    //empty operator
    if (!p_data.mbl_oprtr || p_data.mbl_oprtr === "") {
      return res.status(200).json({
        erMgs: "Mobile service operator not selected",
      });
    }
    //Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(p_data.ttr_usr_eml)) {
      return res.json({
        erMgs: "Please enter a valid email address.",
      });
    }
    //contact validation x3
    const valid_eml_fuc = (e) => {
      const trimmed = e.trim(e);
      const valid_chars = /^\+?[0-9\s\-\(\)]+$/;
      if (!valid_chars.test(trimmed)) {
        return res.status(400).json({
          erMgs: "Phone number contains invalid characters",
        });
      }
      const digits_only = trimmed.replace(/\D/g, "");
      if (digits_only.length < 7 || digits_only.length > 15) {
        return res.json({
          erMgs: "Phone number must contain between 7 and 15 digits.",
        });
      }
    };
    if (p_data.ttr_usr_cntct_1) {
      valid_eml_fuc(p_data.ttr_usr_cntct_1);
    }
    if (p_data.ttr_usr_cntct_2) {
      valid_eml_fuc(p_data.ttr_usr_cntct_2);
    }
    if (p_data.ttr_usr_mblsrvcs_phn) {
      valid_eml_fuc(p_data.ttr_usr_mblsrvcs_phn);
    }

    //profile image compression

    //write to db
    const new_usr = await ttr_usrModel.create({
      //required
      ttr_usr_nm: p_data.ttr_usr_nm,
      ttr_usr_eml: p_data.ttr_usr_eml,
      ttr_usr_cntct_1: p_data.ttr_usr_cntct_1,
      ttr_usr_mblsrvcs_nm: p_data.ttr_usr_mblsrvcs_nm,
      ttr_usr_mblsrvcs_phn: p_data.ttr_usr_mblsrvcs_phn,
      mbl_oprtr: p_data.mbl_oprtr,

      //optional
      ttr_usr_website: p_data.ttr_usr_website || "unlisted",
      ttr_usr_fb_hndl: p_data.ttr_usr_fb_hndl || "unlisted",
      ttr_usr_instrm_hndl: p_data.ttr_usr_instrm_hndl || "unlisted",
      ttr_usr_tiktok_hndl: p_data.ttr_usr_tiktok_hndl || "unlisted",
      ttr_usr_bhnc_hndl: p_data.ttr_usr_bhnc_hndl || "unlisted",
      ttr_usr_cntct_2: p_data.ttr_usr_cntct_2 || "unlisted",
    });

    if (!new_usr) {
      return res.json({
        erMgs: "Unable to complete account details submission",
      });
    }
    //send
    const tmp = `
    <div id="lggd_out_sctn">
     <div id="lggd_out_sctn_cntnts">
    <div id="frgotpwdpgcntnts_tplogo">
      <img src="assets/logos/fmjr_stores official.png" width="25" alt="">
    </div>
    <p id="frgotpwd_ttl">Tutor Account Registration</p>
    <p id="frgotpwd_dscrptn">Submitted tutor account account is under review. Response to be sent through store messages or email address.</p>
    <br><br>
    <div id="lggd_out_sctn_rtrnhmbtn_pnl"><button id="lggd_out_sctn_rtrnhmbtn">Return Home</button></div>
    </div>
    </div>
    `;
    return res.status(200).json({
      accnt_sttus: true,
      accnt_sttus_mgs: tmp,
    });
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
 */

//create tutor account - exisitng account, pending or approvaed cookie based
export const crtttraccntcookielUrl = async (req, res) => {
  const { c } = req.body;
  try {
    const secretKey = Buffer.from(process.env.SECRETHEX, "hex");
    const d_c = await decryptJWT(c, secretKey);
    const usr = await ttr_usrModel.findOne({
      where: {
        associated_usr_eml_id: d_c.payload.ky,
      },
    });
    if (!usr) {
      return res.status(200).json({
        regstr: true,
      });
    }
    if (usr.dataValues.accunt_status === "Pending") {
      const tmp = `
  <div id="lggd_out_sctn">
     <div id="lggd_out_sctn_cntnts">
    <div id="frgotpwdpgcntnts_tplogo">
      <img src="assets/logos/fmjr_stores official.png" width="25" alt="">
    </div>
    <p id="frgotpwd_ttl">Tutor Account Registration</p>
    <p id="frgotpwd_dscrptn">Submitted tutor account account is under review. Response to be sent through store messages or email address.</p>
    <br><br>
    <div id="lggd_out_sctn_rtrnhmbtn_pnl"><button id="lggd_out_sctn_rtrnhmbtn">Return Home</button></div>
    </div>
    </div>
    `;

      return res.status(200).json({
        pending: true,
        pending_mgs: tmp,
      });
    }
    if (usr.dataValues.accunt_status === "Approved") {
      return res.status(200).json({
        approved: true,
        approved_mgs: "rendering approvaed mgs",
      });
    }

    return res.status(200).json({
      usr_dtls_tmp: tmp,
    });
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
