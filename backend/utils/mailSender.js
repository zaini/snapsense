const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
require("dotenv").config();


const sendMail =  (to,subject,body) =>  {
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
    sender: '"Snapsense AI" <seg.snapsense.project@gmail.com>',
    to: "ayanahmad.ahay@gmail.com",
    subject: "TEST NODE EMAIL",
    text: "SEND TEST MAIL",
    html: "<h1>Test Email<h1>"
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
module.exports = sendMail;
