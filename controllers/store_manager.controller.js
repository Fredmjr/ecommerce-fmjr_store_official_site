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
import ttr_usrModel from "../models/tutor_user.model.js";
import {
  ttr_usr_loadJsonlfile_fuc,
  ttr_usr_saveJsonlfile_fuc,
} from "../inventory_assets/data/tutor_usr_jsonl/tutor_usr.js";

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
//tutor accnts
export const ttraccntsUrl = async (req, res) => {
  try {
    // parent & child accounts
    const accnts = await ttr_usrModel.findAll();
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", accnts);
    if (!accnts || accnts.length !== 0) {
      console.log("emppppppppppppppppppppppppp");
      return res.status(200).json({
        erMgs: "No accounts found",
      });
    }
    const prnt_accnts = await usrModel.findAll();

    if (!prnt_accnts) {
      return res.status(200).json({
        erMgs: "Unable to find associated emails to accounts",
      });
    }
    //filter & find email by id associated with parent email account
    const fltrd_accnts = accnts.map((e) => {
      const found_ttr = prnt_accnts.find(
        (tutor) => tutor.dataValues.id === e.associated_usr_eml_id,
      );

      return {
        ttr_nm: e.ttr_usr_nm,
        ttr_eml: found_ttr ? found_ttr.eml : null,
        ttr_id: e.id,
        ttr_sttus: e.accunt_status,
      };
    });

    //Pending
    const pending_accnts = [
      ...new Set(fltrd_accnts.filter((obj) => obj.ttr_sttus === "Pending")),
    ];

    //Approved
    const approved_accnts = [
      ...new Set(fltrd_accnts.filter((obj) => obj.ttr_sttus === "Approved")),
    ];
    if (approved_accnts.length === 0 && pending_accnts.length === 0) {
      return res.status(200).json({
        erMgs: "No accounts found",
      });
    }
    return res.status(200).json({
      pending_accnts: pending_accnts,
      approved_accnts: approved_accnts,
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

// individual tutor account
export const indittraccntsUrl = async (req, res) => {
  const id = req.params.id;
  try {
    const usr = await ttr_usrModel.findOne({
      where: {
        id: id,
      },
    });
    const usr_for_eml = await usrModel.findOne({
      where: {
        id: usr.dataValues.associated_usr_eml_id,
      },
    });
    const ttr_dscrptn_obj = ttr_usr_loadJsonlfile_fuc();
    const ttr_dscrptn = ttr_dscrptn_obj.find(
      (item) => item.id === usr.dataValues.ttr_usr_dscrptn_id,
    );
    const prfl_img = usr.dataValues.ttr_usr_prflimg_path;
    const fltrd_prfl_img = prfl_img.replace(/^public\//, "");
    let el_apprv_btn = "";
    if (usr.dataValues.Pending === "Pending") {
      el_apprv_btn = `<button id="ttraccnt_apprvaccnt_btn" data-id="${usr.dataValues.associated_usr_eml_id}">Approve Account</button>`;
    }
    const usr_accnt_tmp = `
    <div id="prfl_sectn_tem_crd_pflinfo_prfl_topcrdlt">
    <div id="prfl_sectn_tem_crd_pflinfo_prflimg"><img id="prfl_sectn_tem_crd_pflinfo_prflimg_thumbimg" src="${fltrd_prfl_img}" alt=""></div>
    <div>
    </div>
    </div>
    <br />
    <p class="prfl_sectn_tem_crd_pflinfo_ttlcl">Usrname: </p>
    <p class="prfl_sectn_tem_crd_pflinfo_dscrptncl">${usr.dataValues.ttr_usr_nm}</p>
    <p class="prfl_sectn_tem_crd_pflinfo_ttlcl">Tutor Account Description: </p>
    <p class="prfl_sectn_tem_crd_pflinfo_dscrptncl">${ttr_dscrptn.data}</p>
    <p class="prfl_sectn_tem_crd_pflinfo_ttlcl">Email Address: </p>
    <p class="prfl_sectn_tem_crd_pflinfo_dscrptncl">${usr_for_eml.dataValues.eml}</p>
    <p class="prfl_sectn_tem_crd_pflinfo_ttlcl">Website: </p>
    <p class="prfl_sectn_tem_crd_pflinfo_dscrptncl">${usr.dataValues.ttr_usr_website}</p>
    <p class="prfl_sectn_tem_crd_pflinfo_ttlcl">Facebook Social Handle: </p>
    <p class="prfl_sectn_tem_crd_pflinfo_dscrptncl">${usr.dataValues.tr_usr_fb_hndl}</p>
    <p class="prfl_sectn_tem_crd_pflinfo_ttlcl">Instgram Social Handle: </p>
    <p class="prfl_sectn_tem_crd_pflinfo_dscrptncl">${usr.dataValues.ttr_usr_instrm_hndl}</p>
    <p class="prfl_sectn_tem_crd_pflinfo_ttlcl">Tik Tok Social Handle: </p>
    <p class="prfl_sectn_tem_crd_pflinfo_dscrptncl">${usr.dataValues.ttr_usr_tiktok_hndl}</p>
    <p class="prfl_sectn_tem_crd_pflinfo_ttlcl">Behance Social Handle: </p>
    <p class="prfl_sectn_tem_crd_pflinfo_dscrptncl">${usr.dataValues.ttr_usr_bhnc_hndl}</p>
    <p class="prfl_sectn_tem_crd_pflinfo_ttlcl">Contact Line 1: </p>
    <p class="prfl_sectn_tem_crd_pflinfo_dscrptncl">${usr.dataValues.ttr_usr_cntct_1}</p>
    <p class="prfl_sectn_tem_crd_pflinfo_ttlcl">Contact Line 2: </p>
    <p class="prfl_sectn_tem_crd_pflinfo_dscrptncl">${usr.dataValues.ttr_usr_cntct_2}</p>
    <p class="prfl_sectn_tem_crd_pflinfo_ttlcl">Mobile Service Name: </p>
    <p class="prfl_sectn_tem_crd_pflinfo_dscrptncl">${usr.dataValues.ttr_usr_mblsrvcs_nm}</p>
    <p class="prfl_sectn_tem_crd_pflinfo_ttlcl">Mobile Service Number: </p>
    <p class="prfl_sectn_tem_crd_pflinfo_dscrptncl">${usr.dataValues.ttr_usr_mblsrvcs_phn}</p>
    <p class="prfl_sectn_tem_crd_pflinfo_ttlcl">Mobile Service Operator: </p>
    <p class="prfl_sectn_tem_crd_pflinfo_dscrptncl">${usr.dataValues.mbl_oprtr}</p>
    <br /><br />
    <div><button id="ttraccnt_rtntosctnpg_btn">Return</button>${el_apprv_btn}<button id="ttraccnt_dltaccnt_btn" data-id="${usr.dataValues.associated_usr_eml_id}">Delete Account</button></div>
    `;
    return res.status(200).json({
      usr_accnt_tmp: usr_accnt_tmp,
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

//approved account
export const dltttraccntUrl = async (req, res) => {
  const { id } = req.body;
  try {
    const usr = await ttr_usrModel.findOne({
      where: {
        associated_usr_eml_id: id,
      },
    });

    if (!usr) {
      return res.status(200).json({
        erMgs: "No accounts found",
      });
    }
    usr.accunt_status = "Approved";
    await usr.save();
    return res.status(200).json({
      apprvd_accnt__redir: true,
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
//delete account
export const dltindittraccntUrl = async (req, res) => {
  const { id } = req.body;
  try {
    const usr = await ttr_usrModel.findOne({
      where: {
        associated_usr_eml_id: id,
      },
    });

    if (!usr) {
      return res.status(200).json({
        erMgs: "No accounts found",
      });
    }

    await usr.destroy();
    return res.status(200).json({
      dltd_accnt__redir: true,
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
