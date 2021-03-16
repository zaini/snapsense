const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
require("dotenv").config();

let transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.MAIL_AUTH_EMAIL,
      pass: process.env.MAIL_AUTH_PW,
    },
  })
);

async function wrapedSendMail(mailOptions) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error is " + error);
        resolve(false);
      } else {
        console.log("Email sent: " + info.response);
        resolve(true);
      }
    });
  });
}

const sendMail = async (to, subject, body, altBody) => {
  const mailOptions = {
    from: '"Snapsense AI" <seg.snapsense.project@gmail.com>',
    to: to,
    subject: subject,
    text: altBody,
    html: body,
  };
  let resp = await wrapedSendMail(mailOptions);
  return resp;
};
module.exports = sendMail;
