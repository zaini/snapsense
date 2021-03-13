const { AuthenticationError, UserInputError } = require("apollo-server-core");

const {
  Patient,
  Doctor,
  Request,
  Submission,
} = require("../../models/index.js");
const isAuth = require("../../utils/isAuth.js");

module.exports = {
  Query: {
    getRequestsAsPatient: async (_, __, context) => {
      const user = isAuth(context);

      if (user.accountType !== "PATIENT") {
        throw new AuthenticationError(
          "You are not logged into the correct account for this feature."
        );
      }

      const patient = await Patient.findByPk(user.id);

      if (!patient) {
        throw new UserInputError("Invalid patient");
      }

      // const requests = await patient.getRequests();
      const requests = await Request.findAll({
        where: { patient_id: patient.id },
        include: [Doctor, Patient, Submission],
      });
      return requests || [];
    },
    getRequestsAsDoctor: async (_, __, context) => {
      const user = isAuth(context);

      if (user.accountType !== "DOCTOR") {
        throw new AuthenticationError(
          "You are not logged into the correct account for this feature."
        );
      }

      const doctor = await Doctor.findByPk(user.id);

      if (!doctor) {
        throw new UserInputError("Invalid doctor");
      }

      const requests = await Request.findAll({
        where: { doctor_id: doctor.id },
        include: [Doctor, Patient, Submission],
      });
      return requests || [];
    },
  },
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
      if (!(await doctor.hasPatient(patient))) {
        throw new UserInputError("This patient does not belong to you!!");
      }

      // Source for date format below: https://stackoverflow.com/questions/8362952/javascript-output-current-datetime-in-yyyy-mm-dd-hhmsec-format
      try {
        // Create the request and save it
        const request = await new Request({
          doctor_id: doctor.id,
          patient_id: patient.id,
          type: request_type,
          deadline: new Date(parseInt(deadline))
            .toISOString()
            .slice(0, 19)
            .replace(/-/g, "/")
            .replace("T", " "),
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
