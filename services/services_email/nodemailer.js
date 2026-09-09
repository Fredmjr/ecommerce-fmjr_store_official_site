import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_ADDR,
    pass: process.env.EMAIL_PWD,
  },
});

export const single_nodemailer_fuc = async (usr_otp, usr_eml) => {
  const otp_mgs_temp = {
    from: '"fmjr_stores" <fmjrstores@gmail.com>',
    /* to: "fredmjr37@gmail.com", */
    to: `${usr_eml}`,
    subject: "Security Confirmation Code",
    html: `
    <p style="color:#333;">Hello,</p>
    <p style="color:#333;">Here's your confirmation code:</p>
    <br>
    <h1 style="font-size:32px; font-weight:bold; margin:0; color:#333;">
      ${usr_otp}
    </h1>
    <br>
    <p style="color:#333;">Please enter this code within 10 minutes to verify your account.</p>
    <p style="color:#333;">If you did not request this, ignore this email.</p>
    <p style="color:#333;">Best regards,<br/>fmjr_stores Team</p>
  `,
  };
  try {
    const info = await transporter.sendMail(otp_mgs_temp);
    if (info.accepted.length > 0) {
      console.log(info);
      const eml_sent = true;
      return eml_sent;
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
