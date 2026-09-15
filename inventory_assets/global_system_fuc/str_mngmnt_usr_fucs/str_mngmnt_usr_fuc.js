import dotenv from "dotenv";
import str_mngmnt_usrModel from "../../../models/store_management_user.model.js";
import hashpwd from "../../../system_auth/argon2/argon2.hash.js";

dotenv.config();

export const store_management_user_fuc = async (arg_data) => {
  try {
    //sure table exits
    await str_mngmnt_usrModel.sync();

    let created_new_usr = false;
    let created_mgs;
    //find user
    const accnt_exists = await str_mngmnt_usrModel.findOne({
      where: {
        eml: arg_data.eml,
      },
    });

    if (accnt_exists) {
      created_mgs =
        "User with provided credentials exists. login, update details or delete record.";
      return {
        created_new_usr: created_new_usr,
        created_mgs: created_mgs,
      };
    }

    //create user
    const hashedpassword = await hashpwd(arg_data.pwd);
    const hashed_ans_1 = await hashpwd(arg_data.ans_1);
    const hashed_ans_2 = await hashpwd(arg_data.ans_2);
    const hashed_ans_3 = await hashpwd(arg_data.ans_3);

    const new_usr = await str_mngmnt_usrModel.create({
      usr_nm: arg_data.usr_nm,
      phn: arg_data.phn,
      eml: arg_data.eml,
      pwd: hashedpassword,
      phrase_q1: arg_data.phrase_q1,
      phrase_q2: arg_data.phrase_q2,
      phrase_q3: arg_data.phrase_q3,
      ans_1: hashed_ans_1,
      ans_2: hashed_ans_2,
      ans_3: hashed_ans_3,
    });

    if (new_usr) {
      created_new_usr = true;
      created_mgs = "New account created.";
      return {
        created_new_usr: created_new_usr,
        created_mgs: created_mgs,
      };
    }
  } catch (err) {
    console.log(err);
  }
};

const data = {
  usr_nm: process.env.fmjrstores_usr_nm,
  phn: process.env.fmjrstores_phn,
  eml: process.env.fmjrstores_eml,
  pwd: process.env.fmjrstores_pwd,
  phrase_q1: "Who does the store's automations system?",
  phrase_q2: "Embbeded dir for x__code?",
  phrase_q3: "What is the unlazy enviroment called?",
};

const registered_usr = await store_management_user_fuc(data);

if (registered_usr) {
  console.log(registered_usr);
}
