import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cron from "node-cron";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "alwaysdata_logs.jsonl");
const stream = fs.createWriteStream(filePath, { flags: "a" });
const isoString = new Date().toISOString();
const msg_dscrptn =
  "Login back to Alwaysdata.net, today is day 80, approaching 90 days of inactive account activities. Login for the following gmail accounts";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_ADDR,
    pass: process.env.EMAIL_PWD,
  },
});

export const notfication_nodemailer_fuc = async () => {
  const otp_mgs_temp = {
    from: `"fmjr_stores" <${process.env.EMAIL_ADDR}>`,
    to: `${process.env.EMAIL_ADDR}`,
    subject: "Alwaysdata Account Renew Login",
    html: `
    <p style="color:#333;">Hello Store Manager,</p>
    <p style="color:#333; margin:3px 0px;">${msg_dscrptn};</p>
    <br>
    <p style="color:#333; margin:3px 0px;">accnt_hshels:</p>
    <p style="color:wheat; margin:3px 0px;">${process.env.accnt_hshels}</p>
    <br>
    <p style="color:#333; margin:3px 0px;">accnt_chatwebsocket:</p>
    <p style="color:wheat; margin:3px 0px;">${process.env.accnt_portfolio_2025}</p>
    <br>
    <p style="color:#333; margin:3px 0px;">accnt_chatwebsocket:</p>
    <p style="color:wheat; margin:3px 0px;">${process.env.accnt_chatwebsocket}</p>
    <br>
    <p style="color:#333; margin:3px 0px;">accnt_jetstorrent:</p>
    <p style="color:wheat; margin:3px 0px;">${process.env.accnt_jetstorrent}</p>
    <br>
    <p style="color:#333; margin:3px 0px;">accnt_gatteways:</p>
    <p style="color:wheat; margin:3px 0px;">${process.env.accnt_gatteways}</p>
    <br>
    <p style="color:#333; margin:3px 0px;">accnt_guestgmail01:</p>
    <p style="color:wheat; margin:3px 0px;">${process.env.accnt_guestgmail01}</p>
    <br>
    <p style="color:#333; margin:3px 0px;">accnt_cloud1:</p>
    <p style="color:wheat; margin:3px 0px;">${process.env.accnt_cloud1}</p>
    <br>
    <p style="color:#333; margin:3px 0px;">accnt_notepad:</p>
    <p style="color:wheat; margin:3px 0px;">${process.env.accnt_notepad}</p>
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

export const a_fuc = async () => {
  console.log("hi");
  //send email notification
  const eml_response = await notfication_nodemailer_fuc();

  //log action
  let eml_sent = false;
  if (eml_response) {
    eml_sent = true;
    console.log("success");
  } else {
    console.log("failed");
  }

  const log_data = {
    service: "alwaysdata_account_renew_login",
    timestamp: new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "medium",
    }).format(new Date(isoString)),
    mgs: msg_dscrptn,
    eml_sent: eml_sent,
  };
  stream.write(JSON.stringify(log_data) + "\n");
};

//dealine file
export const deadlinefile_fuc = async () => {
  const file = path.join(__dirname, "alwaysdata_logs_data.jsonl");
  let data = JSON.parse(fs.readFileSync(file, "utf8"));
  let item = Array.isArray(data) ? data[0] : data;

  item.till_deadline = (Number(item.till_deadline) || 0) + 1;
  item.timestamp = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "medium",
  }).format(new Date(isoString));

  if (item.till_deadline >= 80) {
    await a_fuc();
    item.till_deadline = 0;
  }

  fs.writeFileSync(file, JSON.stringify(data));
  console.log(data);
};

export const MAS_alwaysdata_logs_fuc = () => {
  cron.schedule("35 21 * * *", async () => {
    await deadlinefile_fuc();
  });
};
