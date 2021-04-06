require("dotenv").config({ path: "../../.env" });
const sendMail = require("./mailSender");
const giveTemplate = require("./emailTemplateProvider");

const transactionalEmailSender = async (emailParams, htmlParams) => {
  // If the env is in testing, don't send emails as it could hang or take a while and break the tests
  if (process.env.NODE_ENV && process.env.NODE_ENV === "test") return true;

  try {
    // Retrieve HTML code by passing essential information to Template Provider
    const htmlContent = giveTemplate(emailParams.template, htmlParams);

    // Send main using Nodemailer
    await sendMail(
      emailParams.to,
      emailParams.subject,
      htmlContent,
      emailParams.altbody
    );
    console.log("Email Sent");
    return true;
  } catch (err) {
    // If the email was not succesfully sent
    console.log(err);
    return false;
  }
};

module.exports = transactionalEmailSender;
