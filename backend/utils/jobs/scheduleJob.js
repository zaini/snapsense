const moment = require("moment");
const enqueueEmail = require("../scheduledEmail");

const scheduleJob = async (doctor, patient, daysLeft) => {
  // Set email parameters for the template
  const htmlParams = {
    doctor: doctor.email,
    patient: patient.email,
    days: daysLeft,
  };

  // Set essential email parameters
  const emailParams = {
    to: patient.email,
    subject: "Submission Reminder",
    altbody:
      "Please open the snapsense panel and fulfill the required request.",
    template: "reminder",
    status: 0,
  };

  // Insert bundled email params into model
  await enqueueEmail(emailParams, htmlParams);
};

module.exports = scheduleJob;
