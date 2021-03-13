const { UserInputError, AuthenticationError } = require("apollo-server");
const { Doctor, Hospital, Patient } = require("../../models/index.js");
const isAuth = require("../../utils/isAuth");

module.exports = {
  Query: {
    getDoctors: async () => {
      try {
        const doctors = await Doctor.findAll();
        return doctors;
      } catch (error) {
        throw new Error(error);
      }
    },
    getDoctorsByAdmin: async (_, __, context) => {
      const user = isAuth(context);

      if (user.accountType !== "ADMIN") {
        throw new AuthenticationError(
          "You are not logged into the correct account for this feature."
        );
      }

      const hospital = await Hospital.findByPk(user.hospital_id);

      if (!hospital) {
        throw new UserInputError("Invalid hospital");
      }
      const doctors = await hospital.getDoctors();
      return doctors || [];
    },
    getDoctorsByPatient: async (_, __, context) => {
      const user = isAuth(context);

      if (!(user.accountType === "PATIENT")) {
        throw new AuthenticationError(
          "You are not logged into the correct account for this feature."
        );
      }

      const patient = await Patient.findByPk(user.id);

      if (!patient) {
        throw new UserInputError(
          "Your are not logged into a valid patient account."
        );
      }

      const doctors = await patient.getDoctors();
      return doctors || [];
    },
  },
  Mutation: {},
};
