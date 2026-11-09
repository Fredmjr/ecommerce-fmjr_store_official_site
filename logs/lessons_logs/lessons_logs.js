import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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

const customer_fuc = async (usr_eml) => {
  const time_date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "medium",
  }).format(new Date(isoString));
  const mgs_temp = {
    from: `"fmjr_stores" <${process.env.EMAIL_ADDR}>`,
    to: `${usr_eml}`,
    subject: "Account Registration",
    html: `
    <p style="color:#333;">Hello there,</p>
    <p style="color:#333; margin:3px 0px;">You have registered for a Graphics Design Crash Course on our online store, fmjr_stores (https://www.fmjrstores.com).</p>
    <br>
    <p style="color:#333; margin:3px 0px;">If this was not submitted by you, you can ignore this message, contact any of our contact lines or social handles on our online store (https://www.fmjrstores.com).</p>
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

const strmngr_fuc = async (usr_eml) => {
  const time_date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "medium",
  }).format(new Date(isoString));
  const mgs_temp = {
    from: `"fmjr_stores" <${process.env.EMAIL_ADDR}>`,
    to: `${process.env.EMAIL_ADDR}`,
    subject: "Account Registration",
    html: `
    <p style="color:#333;">Hello Store Manager,</p>
    <p style="color:#333; margin:3px 0px;">A cusomter has registered for a Graphics Design Crash Course.</p>
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

export const lessons_nodemailer_fuc = async (usr_eml) => {
  //send email
  const eml_response = await customer_fuc(usr_eml);
  let eml_sent = false;
  if (eml_response) {
    eml_sent = true;
    await strmngr_fuc(usr_eml);
  }

  //save to jsonl
  const filePath = path.join(
    __dirname,
    "..",
    "lessons_logs",
    "lessons_logs.jsonl",
  );
  const stream = fs.createWriteStream(filePath, { flags: "a" });
  const isoString = new Date().toISOString();
  const log_data = {
    usr_eml: usr_eml,
    timestamp: new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "medium",
    }).format(new Date(isoString)),
    eml_sent: eml_sent,
  };
  stream.write(JSON.stringify(log_data) + "\n");
  return { task_done: true };
};
