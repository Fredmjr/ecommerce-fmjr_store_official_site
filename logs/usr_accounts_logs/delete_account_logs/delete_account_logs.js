import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import usrModel from "../../../models/user.model.js";
import cron from "node-cron";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "delete_account_logs.jsonl");
const stream = fs.createWriteStream(filePath, { flags: "a" });
const isoString = new Date().toISOString();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_ADDR,
    pass: process.env.EMAIL_PWD,
  },
});

export const notfication_nodemailer_fuc = async (
  service,
  timestamp,
  code_executor,
  mgs,
  mgs_dscrptn,
) => {
  const otp_mgs_temp = {
    from: `"fmjr_stores" <${process.env.EMAIL_ADDR}>`,
    to: `${process.env.EMAIL_ADDR}`,
    subject: "Deletion of Inactive Accounts",
    text: `Hello Store Manager,\n\nService: ${service}\nTimestamp: ${timestamp}\nCode_executor: ${code_executor}\nMessage: ${mgs}\nMessage Description: ${mgs_dscrptn}\n\nBest regards,\nfmjr_stores Management Automated System (MAS)`,
    html: `
    <p style="color:#333;">Hello Store Manager,</p>
    <br>
    <p style="color:#333; margin:3px 0px;">Service:</p>
    <p style="color:wheat; margin:3px 0px;">"${service}"</p>
    <br>
    <p style="color:#333; margin:3px 0px;">Timestamp:</p>
    <p style="color:wheat; margin:3px 0px;">${timestamp}</p>
    <br>
    <p style="color:#333; margin:3px 0px;">Code_executor:</p>
    <p style="color:wheat; margin:3px 0px;">${code_executor}</p>
    <br>
    <p style="color:#333; margin:3px 0px;">Message:</p>
    <p style="color:wheat; margin:3px 0px;">${mgs}</p>
    <br>
    <p style="color:#333; margin:3px 0px;">Message Description:</p>
    <p style="color:wheat; margin:3px 0px;">${mgs_dscrptn}</p>
    <br>
    <p style="color:#333;">Best regards,<br/>fmjr_stores Management Automated System (MAS)</p>
  `,
  };
  try {
    const info = await transporter.sendMail(otp_mgs_temp);
    if (info.accepted.length > 0) {
      /*   console.log(info); */
      const eml_sent = true;
      return eml_sent;
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const delete_account_logs_fuc = async () => {
  //find accounts
  const all_inactive_accunts = await usrModel.findAll({
    where: {
      accunt_otp_status: "Inactive",
    },
  });

  if (all_inactive_accunts) {
    //log & mgs variables
    const service = "delete_inactive_accounts";
    const timestamp = new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "medium",
    }).format(new Date(isoString));
    const code_executor =
      "logs/usr_accounts_logs/delete_account_logs/delete_account_logs.js";
    const mgs = `Deleted ${all_inactive_accunts.length} inactive accunt_otp_status user accounts`;
    const mgs_dscrptn =
      "Accounts that never confirmed using an email otp code deleted every 23hrs when traffic is less.";

    //perform delete action
    /*     await all_inactive_accunts.destroy(); */

    //send email notification
    const eml_response = await notfication_nodemailer_fuc(
      service,
      timestamp,
      code_executor,
      mgs,
      mgs_dscrptn,
    );
    //log action
    let eml_sent = false;
    if (eml_response) {
      eml_sent = true;
    }
    const log_data = {
      service: service,
      timestamp: timestamp,
      code_executor: code_executor,
      mgs: mgs,
      mgs_dscrptn: mgs_dscrptn,
      eml_sent: eml_sent,
    };

    stream.write(JSON.stringify(log_data) + "\n");
  }
};

//exported automated management system delete account logs function (MAS)
export const MAS_delete_account_logs_fuc = () => {
  //delete inactive accounts - every at 23hrs
  cron.schedule("0 23 * * *", async () => {
    await delete_account_logs_fuc();
  });
};
