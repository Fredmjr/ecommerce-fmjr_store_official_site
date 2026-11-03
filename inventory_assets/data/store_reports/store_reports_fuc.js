import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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

const customer_nodemailer_fuc = async (usr_eml, report_mgs) => {
  const time_date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "medium",
  }).format(new Date(isoString));
  const mgs_temp = {
    from: `"fmjr_stores" <${process.env.EMAIL_ADDR}>`,
    to: `${usr_eml}`,
    subject: "Submitted Store Issue Report",
    html: `
    <p style="color:#333;">Hello there,</p>
    <p style="color:#333; margin:3px 0px;">This message serves to notify you that you have noticed and reported an issue on our online store, fmjr_stores (https://www.fmjrstores.com).</p>
    <p style="color:#333; margin:3px 0px;">Response will be sent through this provided email address or through our in-store messages on my our store.</p>
    <br>
    <p style="color:#333; margin:3px 0px;">Issue Report Description;</p>
    <p style="color:#333; margin:3px 0px; color:wheat;">${report_mgs}</p>
    <br>
    <p style="color:#333; margin:3px 0px;">If this was not submitted by you, you can ignore this message or contact any of our contact lines or social handles which are on our online store (https://www.fmjrstores.com).</p>
    <br>
    <p style="color:#333; margin:3px 0px;">${time_date}</p>
    <p style="color:#333;">Best regards,<br/>fmjr_stores Team</p> `,
  };
  try {
    const info = await transporter.sendMail(mgs_temp);
    if (info.accepted.length > 0) {
      /*   console.log(info); */
      const eml_sent = true;
      return eml_sent;
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const strmngr_nodemailer_fuc = async (usr_eml, report_mgs, usr_id) => {
  const time_date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "medium",
  }).format(new Date(isoString));
  const mgs_temp = {
    from: `"fmjr_stores" <${process.env.EMAIL_ADDR}>`,
    to: `${process.env.EMAIL_ADDR}`,
    subject: "Submitted Store Issue Report",
    html: `
    <p style="color:#333;">Hello Store Manager,</p>
    <p style="color:#333; margin:3px 0px;">A cusomter/user has submitted an issue report.</p>
    <p style="color:#333; margin:3px 0px;">Issue Report Description;</p>
     <p style="color:#333; margin:3px 0px; color:wheat;">${report_mgs}</p>
     <br>
     <p style="color:#333; margin:3px 0px;">Account ID: ${usr_id}</p>
    <p style="color:#333; margin:3px 0px;">Account Email Address: ${usr_eml}</p>
    <p style="color:#333; margin:3px 0px;">Timestamp: ${time_date}</p>
    <p style="color:#333;">Best regards,<br/>fmjr_stores Management Automated System (MAS)</p>
  `,
  };
  try {
    const info = await transporter.sendMail(mgs_temp);
    if (info.accepted.length > 0) {
      /*   console.log(info); */
      const eml_sent = true;
      /*  return eml_sent; */
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const issue_reports_fuc = async (usr_id, usr_eml, report_mgs) => {
  //send email
  const eml_response = await customer_nodemailer_fuc(usr_eml, report_mgs);
  let eml_sent = false;
  if (eml_response) {
    eml_sent = true;
    await strmngr_nodemailer_fuc(usr_eml, report_mgs, usr_id);
  }

  //save to jsonl
  const filePath = path.join(
    __dirname,
    "..",
    "inventory_assets",
    "data",
    "store_reports",
    "issue_reports.jsonl",
  );
  const stream = fs.createWriteStream(filePath, { flags: "a" });
  const isoString = new Date().toISOString();
  const log_data = {
    usr_id: usr_id,
    usr_eml: usr_eml,
    timestamp: new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "medium",
    }).format(new Date(isoString)),
    report_mgs: report_mgs,
    eml_sent: false,
  };
  stream.write(JSON.stringify(log_data) + "\n");

  return { task_done: true };
};
