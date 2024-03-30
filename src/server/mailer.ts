import nodemailer from "nodemailer";

export async function sendLoginEmail({ email }: { email: string }) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "OTP email",
    text: " your secure email password is 123456 ",
  };

  console.log("MAil values ", mailOptions);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
}
