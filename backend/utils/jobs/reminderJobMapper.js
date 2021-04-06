const { ApolloError } = require("apollo-server-core");
const moment = require("moment");

const { Doctor, Patient } = require("../../models/index.js");
const scheduleJob = require("./scheduleJob.js");

const reminderJobMapper = async (result, days, isCancelled) => {
  // return early if the job was already cancelled
  if (isCancelled) return;
  try {
    const request = result;
    const deadline = moment(request.dataValues.deadline);
    const diffHours = deadline.diff(moment(), "hours");
    const upperBound = days * 24;
    const lowerBound = (days - 1) * 24;

    if (diffHours <= upperBound && diffHours > lowerBound) {
      const doctor = await Doctor.findByPk(request.doctor_id);
      const patient = await Patient.findByPk(request.patient_id);
      await scheduleJob(doctor.dataValues, patient.dataValues, days);
    }

    return true;
  } catch (err) {
    throw new ApolloError(err, 500);
  }
};
module.exports = reminderJobMapper;
