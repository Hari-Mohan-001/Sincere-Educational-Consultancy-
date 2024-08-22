import nodemailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transporter: Transporter<SMTPTransport.SentMessageInfo> =
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    secure: false, // true for 465, false for other ports
    requireTLS: true,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  } as SMTPTransport.Options);

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

export const sendMail = async (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: process.env.SMTP_MAIL, // Sender address
    to, // List of recipients
    subject, // Subject line
    text, // Plain text body
    // html: '<b>Hello world?</b>' // You can also use HTML
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
