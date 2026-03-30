import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
import { ENV } from "../config/env.js";

export const sendInvoiceEmail = async ({
  userEmail,
  userName,
  courseName,
  amount,
  orderId
}) => {
  const doc = new PDFDocument();
  const buffers = [];

  doc.on("data", buffers.push.bind(buffers));
  doc.on("end", async () => {
    const pdfBuffer = Buffer.concat(buffers);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: ENV.EMAIL_USER,
        pass: ENV.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from:ENV.EMAIL_USER,
      to: userEmail,
      subject: "EduPath Course Invoice",
      html: `
        <h2>Hi ${userName},</h2>
        <p>Thank you for purchasing <b>${courseName}</b>.</p>
        <p>Your invoice is attached with this email.</p>
      `,
      attachments: [
        {
          filename: `invoice-${orderId}.pdf`,
          content: pdfBuffer
        }
      ]
    });
  });

  doc.fontSize(22).text("EduPath Invoice", { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text(`Order ID: ${orderId}`);
  doc.text(`Student: ${userName}`);
  doc.text(`Course: ${courseName}`);
  doc.text(`Amount Paid: ₹${amount}`);
  doc.text(`Date: ${new Date().toLocaleDateString()}`);
  doc.end();
};