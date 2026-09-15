import { accntscrdlets } from "../inventory_assets/data/data_components/store_management.js";
import {
  generate_otp_fuc,
  verify_otp_fuc,
} from "../inventory_assets/export_fucs/otp/otp.js";
import str_mngmnt_usrModel from "../models/store_management_user.model.js";
import usrModel from "../models/user.model.js";
import { single_nodemailer_fuc } from "../services/services_email/nodemailer.js";
import verifypwd from "../system_auth/argon2/argon2.verfy.js";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import { encryptJWT } from "../middleware/jwe/encrypt.js";
import { decryptJWT } from "../middleware/jwe/decrypt.js";

dotenv.config();

const uuid = uuidv4();

//user features cards
export const accntscrdletsUrl = async (req, res) => {
  try {
    return res.status(200).json({
      accnt_crdlets: accntscrdlets,
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
//all user accounts
export const allaccntsUrl = async (req, res) => {
  try {
    const all_accnts = await usrModel.findAll();
    if (all_accnts.length === 0) {
      return res.status(404).json({
        erMgs: `
         <div id="strmgmntaccnts_section_main_ermgs">
      <div id="strmgmntaccnts_section_main_ermgs_img"><img src="dist/imgs/annoucement_unavailable.webp" width="55"></div>
      <p id="strmgmntaccnts_section_main_ermgs_txt">No Accounts Fund</p>
    </div>
          `,
      });
    }

    const all_accnts_fltrd = all_accnts.map((e) => ({
      eml: e.dataValues.eml,
      id: e.dataValues.id,
      usr_nm: e.dataValues.usr_nm,
      created_at: e.dataValues.createdAt,
      accunt_otp_status: e.dataValues.accunt_otp_status,
    }));

    //inactive
    const inactive_accnts = [
      ...new Set(
        all_accnts_fltrd.filter((obj) => obj.accunt_otp_status === "Inactive"),
      ),
    ];

    //active
    const active_accnts = [
      ...new Set(
        all_accnts_fltrd.filter((obj) => obj.accunt_otp_status === "Active"),
      ),
    ];

    return res.status(200).json({
      active_accnts: active_accnts,
      inactive_accnts: inactive_accnts,
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
//all user accounts
export const dltaccntUrl = async (req, res) => {
  const id = req.params.id;
  try {
    //delete account
    const accnt = await usrModel.findByPk(id);
    if (!accnt) {
      return res.status(400).json({
        erMgs: "Unable to retrieve & perform action on account.",
      });
    }
    await accnt.destroy();
    //retrieve refreshed inactive accounts
    const all_accnts = await usrModel.findAll({
      where: {
        accunt_otp_status: "Inactive",
      },
    });
    const all_inactive_fltrd_accnts = all_accnts.map((e) => ({
      eml: e.dataValues.eml,
      id: e.dataValues.id,
      usr_nm: e.dataValues.usr_nm,
      created_at: e.dataValues.createdAt,
      accunt_otp_status: e.dataValues.accunt_otp_status,
    }));

    return res.status(200).json({
      all_inactive_fltrd_accnts: all_inactive_fltrd_accnts,
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

//login store manager
export const lgnstrmngrUrl = async (req, res) => {
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
    const accnt_exists = await str_mngmnt_usrModel.findOne({
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
      return res
        .status(200)
        .render("components/store_managment/store_managment_login_otp_pg");
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

// Q&A pass phrase
export const lgnusrphrspssUrl = async (req, res) => {
  const { code, eml } = req.body;
  try {
    const usr = await str_mngmnt_usrModel.findOne({
      where: {
        eml: eml,
      },
    });

    if (usr) {
      const results = await verify_otp_fuc(usr.dataValues.id, code);

      if (!results || results === false) {
        return res.json({
          erMgs: "Incorrect code or code has expired",
        });
      }

      //pass Q$A phrase
      return res.json({
        qa_redir: true,
        q1: "Who does the store's automations system?",
        q2: "Embbeded dir for x__code?",
        q3: "What is the unlazy enviroment called?",
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

// / Q&A pass phrase
export const cnfrmlgnusrphrspssUrl = async (req, res) => {
  const { e1, e2, e3, eml } = req.body;
  try {
    console.log(e1, e2, e3);
    if (!e1 || !e2 || !e3 || !eml) {
      console.log(e1);
      return res.json({
        erMgs: "Please fill in the question form.",
      });
    }

    const usr = await str_mngmnt_usrModel.findOne({
      where: {
        eml: eml,
      },
    });

    if (usr) {
      //compare hashed answer with loged answer
      //q1
      const is_q1_valid = await verifypwd(usr.ans_1, e1);
      if (!is_q1_valid) {
        console.log(e1);
        return res.json({
          erMgs: "Incorrect answer 1, try again.",
        });
      }
      //q2
      const is_q2_valid = await verifypwd(usr.ans_2, e2);
      if (!is_q2_valid) {
        console.log(e2);
        return res.json({
          erMgs: "Incorrect answer 2, try again.",
        });
      }
      //q3
      const is_q3_valid = await verifypwd(usr.ans_3, e3);
      if (!is_q3_valid) {
        console.log(e3);
        return res.json({
          erMgs: "Incorrect answer 3, try again.",
        });
      }

      /*      const results = await verify_otp_fuc(usr.dataValues.id, code);
      console.log(results);

      if (results === false) {
        return res.json({
          erMgs: "Incorrect code or code has expired",
        });
      } */
      //update user account to active (otherwise will be deleted later)
      //update
      /*       usr.accunt_otp_status = "Active";
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
      }
 */
      //pass Q$A phrase

      return res
        .status(200)
        .render("components/store_managment/store_managment");
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

//auto login
export const autolgnUrl = async (req, res) => {
  const { eml } = req.body;
  try {
    console.log(eml);
    if (!eml) {
      return res.json({
        erMgs: "No email detected in body payload",
      });
    }
    const usr = await str_mngmnt_usrModel.findOne({
      where: {
        eml: eml,
      },
    });

    if (usr) {
      //jwe
      const token = {
        ky: usr.dataValues.id,
      };
      const secretKey = Buffer.from(process.env.SECRETHEX, "hex");
      const usr_jwe = await encryptJWT(token, secretKey);
      //jwt
      /*    const data = {
        usr_id: usr.dataValues.id,
      };
      const JWT = jwt.sign(data, process.env.SECRET_KEY, {
        expiresIn: "1h",
      }); */
      return res.json({
        tkn_redir: true,
        str_mngr_jwt_token: usr_jwe,
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

//decryt jwe cookie
export const dcrptckieUrl = async (req, res) => {
  const { c } = req.body;
  try {
    if (!c) {
      return res.json({
        erMgs: "Empty payload",
      });
    }
    const secretKey = Buffer.from(process.env.SECRETHEX, "hex");
    const d_c = await decryptJWT(c, secretKey);
    if (d_c) {
      return res
        .status(200)
        .render("components/store_managment/store_managment");
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
