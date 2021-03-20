const { ApolloError } = require("apollo-server");

const { ScheduledRequest } = require("../models/index.js");

const updateScheduledRequest = async (sRequest) => {
  try {
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
    throw new ApolloError(error, 500);
  }
};

module.exports = updateScheduledRequest;
