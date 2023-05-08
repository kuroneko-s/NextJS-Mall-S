import nodemailer from "nodemailer";

interface MailProps {
  to: string;
  subject: string;
  htmlMsg?: string;
  msg?: string;
}

export const Mail = async ({ to, subject, htmlMsg, msg }: MailProps) => {
  const transporter = nodemailer.createTransport({
    host: process.env.NAVER_SMTP_HOST!,
    port: Number(process.env.NAVER_SMTP_PORT!),
    secure: false,
    auth: {
      user: process.env.NAVER_SMTP_USER!,
      pass: process.env.NAVER_SMTP_PASS!,
    },
  });

  return await transporter.sendMail({
    to: to,
    from: "kuroneko2@naver.com",
    subject: subject,
    html: msg === undefined ? htmlMsg : msg,
  });
};
