const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
require("dotenv").config();


const sendMail =  (to,subject,body,altBody) =>  {
  let transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.MAIL_AUTH_EMAIL,
        pass: process.env.MAIL_AUTH_PW
      },
    })
  );

  const mailOptions = {
    from: '"Snapsense AI" <seg.snapsense.project@gmail.com>',
    to: to,
    subject: subject,
    text: altBody,
    html: body
  };

  transporter.sendMail(mailOptions,  (error, info) => {
    if (error) {
      throw new Error("500 Internal Server Error: Error Sending Mail");
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
module.exports = sendMail;
