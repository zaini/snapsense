const os = require("os");
const pMap = require("p-map");
const { parentPort } = require("worker_threads");
const { Op } = require("sequelize");

const {
  Request,
  Doctor,
  Patient,
  ScheduledEmail,
} = require("../models/index.js");
const enqueueEmail = require("../utils/scheduledEmail.js");
const { ApolloError } = require("apollo-server-core");

const scheduleJob = async (doctor, patient, request) => {
  // Set email parameters for the template
  const htmlParams = {
    doctor: doctor.email,
    patient: patient.email,
    days: "7",
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

(async () => {
  let isCancelled = false;

  const mapper = async (result) => {
    // return early if the job was already cancelled
    if (isCancelled) return;
    try {
      const request = result.dataValues;
      const doctor = await Doctor.findByPk(request.doctor_id);
      const patient = await Patient.findByPk(request.patient_id);
      await scheduleJob(doctor.dataValues, patient.dataValues, request);

      return true;
    } catch (err) {
      throw new ApolloError("Internal Server Error, SQL FAILED", 500);
    }
  };

  const concurrency = os.cpus().length;

  // Fetch requests that are due in the next 7 days
  const requestsFetched = await Request.findAll({
    where: {
      fulfilled: null,
    },
  });

  // at least one submission in need of a reminder email
  if (requestsFetched.length > 0) {
    if (parentPort) {
      parentPort.once("message", (message) => {
        if (message === "cancel") isCancelled = true;
      });
    }

    // each Submission object is passed to mapper for concurrent execution
    await pMap(requestsFetched, mapper, { concurrency });

    if (parentPort) parentPort.postMessage("done");
    else process.exit(0);
  } else {
    console.log("___________No Reminders to Send___________");
  }

  // signal to parent that the job is done
  if (parentPort) parentPort.postMessage("done");
  else process.exit(0);
})();
