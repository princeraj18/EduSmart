import nodemailer from "nodemailer";
import { ENV } from "../config/env.js";

export const sendResetPasswordEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: ENV.EMAIL_USER,
      pass: ENV.EMAIL_PASS,
    },
  });

  const resetLink = `${ENV.CLIENT_URL}/reset-password/${token}`;

  await transporter.sendMail({
    from: `"EduPath" <${ENV.EMAIL_USER}>`,
    to: email,
    subject: "Reset Your EduPath Password",
    html: `
      <h2>Password Reset Request</h2>
      <p>Click below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link expires in 15 minutes.</p>
    `,
  });
};
 