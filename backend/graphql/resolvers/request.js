const { AuthenticationError, UserInputError } = require("apollo-server-core");

const { Patient, Doctor, Request } = require("../../models/index.js");
const isAuth = require("../../utils/isAuth.js");

module.exports = {
  Query: {},
  Mutation: {
    createRequest: async (
      _,
      { request_type, deadline, patient_id },
      context
    ) => {

			// Authenticate user
      const user = isAuth(context);
      if (!user.accountType || user.accountType !== "DOCTOR") {
        throw new AuthenticationError("Invalid user credentials!");
      }

			// Check that the doctor and patient both exist
      const doctor = await Doctor.findByPk(user.id);
      if (!doctor) {
        throw new UserInputError("Invalid user!");
      }

      const patient = await Patient.findByPk(patient_id);
      if (!patient) {
        throw new UserInputError("Invalid patient!");
      }

			// Check that the doctor 'has' this patient
			if(! await doctor.hasPatient(patient)) {
				throw new UserInputError("This patient does not belong to you!!");
			}

      // Source for date format below: https://stackoverflow.com/questions/8362952/javascript-output-current-datetime-in-yyyy-mm-dd-hhmsec-format
      try {
				// Create the request and save it
        const request = await new Request({
          doctor_id: doctor.id,
          patient_id: patient.id,
          type: request_type,
          deadline: (new Date(parseInt(deadline))).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " "), 
        }).save();

				// Assign the request to both the doctor and patient
        doctor.addRequest(request);
        patient.addRequest(request);
      } catch (error) {
				// An error will be thrown if the request is invalid as a result of a user input error
        throw new UserInputError(error);
      }

			// Everything was successful so return false
      return true;
    },
  },
};
