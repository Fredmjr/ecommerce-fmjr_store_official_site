import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "newsletter_create_usr.jsonl");
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
//user notify
const send_usr_fuc = async (arg_eml, arg_timestamp) => {
  const mgs_temp = {
    from: `"fmjr_stores" <${process.env.EMAIL_ADDR}>`,
    to: `${arg_eml}`,
    subject: "Newsletter Subscription",
    text: `Welcome to fmjr_stores,\n\nNewsletter Subscription\n\nThank you for subscribing to our newsletter. We look forward to sharing updates with you soon.\n\nBest regards,\nfmjr_stores Team`,
    html: `
    <p style="color:#333;">Welcome to fmjr_stores,</p>
    <h1 style="font-size:25px; font-weight:bold; margin:0; color:#333;">Newsletter Subscription</h1><br />
    <p style="color:#333;">Thank you for subscribing to our newsletter. We look forward to sharing our latest updates and exclusive content.</p>
    <p style="color:#333;">Registered email address: ${arg_eml}</p>
    <p style="color:#333;"> ${arg_timestamp}</p>
    <p style="color:#333;">Best regards,<br/>fmjr_stores Team</p>
  `,
  };
  try {
    const info = await transporter.sendMail(mgs_temp);
    if (info.accepted.length > 0) {
      const eml_sent = true;
      return eml_sent;
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
//store manager notify
const send_strmngr_fuc = async (arg_eml, arg_timestamp) => {
  const mgs_temp = {
    from: `"fmjr_stores" <${process.env.EMAIL_ADDR}>`,
    to: `${process.env.EMAIL_ADDR}`,
    subject: "Newsletter Subscription",
    text: `Hello Store Manager,\n\nNewsletter Subscription\n\nUser account with the following email address; ${arg_eml} has registered for newsletter.\n\nBest regards,\nfmjr_stores Management Automated System (MAS)`,
    html: `
    <p style="color:#333;">Hello Store Manager,</p>
    <h1 style="font-size:25px; font-weight:bold; margin:0; color:#333;">Newsletter Subscription</h1><br />
    <p style="color:#333;">User account with the following email address; ${arg_eml} has registered for newsletter.</p>
     <p style="color:#333;"> ${arg_timestamp}</p>
     <p style="color:#333;">Best regards,<br/>fmjr_stores Management Automated System (MAS)</p>
  `,
  };
  try {
    const info = await transporter.sendMail(mgs_temp);
    if (info.accepted.length > 0) {
      const eml_sent = true;
      return eml_sent;
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const nwslttr_usr_nodemailer_fuc = async (arg_eml) => {
  const timestamp = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "medium",
  }).format(new Date(isoString));

  //send email notification
  const eml_response = await send_usr_fuc(arg_eml, timestamp);
  //log action
  let eml_sent = false;
  let strmngr_eml_sent = false;
  if (eml_response) {
    eml_sent = eml_response;
    strmngr_eml_sent = await send_strmngr_fuc(arg_eml, timestamp);
  }
  const log_data = {
    service: "newsletter subscription",
    timestamp: timestamp,
    mgs: "User subscribed to store newsletter.",
    eml_sent: eml_sent,
    strmngr_eml_sent: strmngr_eml_sent,
  };

  stream.write(JSON.stringify(log_data) + "\n");
  return true;
};
