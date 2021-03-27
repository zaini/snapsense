const { UserInputError } = require("apollo-server");

const { Request, Doctor, Patient } = require("../models/index.js");

const createRequest = async (requestIn, deadline) => {
  // Source for date format below: https://stackoverflow.com/questions/8362952/javascript-output-current-datetime-in-yyyy-mm-dd-hhmsec-format
  try {
    const doctor = await Doctor.findByPk(requestIn.doctor_id);
    const patient = await Patient.findByPk(requestIn.patient_id);

    // Create the request and save it
    const request = await new Request({
      doctor_id: requestIn.doctor_id,
      patient_id: requestIn.patient_id,
      type: requestIn.type,
      deadline: deadline,
    }).save();

    // Assign the request to both the doctor and patient
    await doctor.addRequest(request);
    await patient.addRequest(request);
    return true;
  } catch (error) {
    // An error will be thrown if the request is invalid as a result of a user input error
    throw new UserInputError(error);
  }
};

module.exports = createRequest;
