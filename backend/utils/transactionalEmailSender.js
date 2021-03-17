const sendMail = require("./mailSender");
const giveTemplate = require("./emailTemplateProvider");

const transactionalEmailSender = async (emailParams, htmlParams) => {
  console.log(emailParams);
  console.log(htmlParams);
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
