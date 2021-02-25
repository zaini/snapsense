const { ApolloError, AuthenticationError } = require("apollo-server");
const { Doctor, Patient } = require("../../models/index.js");
const { isAuth } = require("../../utils/isAuth");

module.exports = {
  Query: {
    getPatients: async () => {
      try {
        const patients = await Patient.findAll();
        return patients;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    addPatientToDoctor: async (_, { patient_email, doctor_email }, context) => {
      const doctor = await Doctor.findOne({ where: { email: doctor_email } });
      const patient = await Patient.findOne({
        where: { email: patient_email },
      });

      // TODO check this is working properly. Similar to the check occuring on InviteExistingUser but now on the backend
      const user = isAuth(context);
      const { email, accountType } = verify(user, ACCESS_TOKEN_SECRET_KEY);

      if (!(accountType === "PATIENT" && email === patient_email)) {
        throw new AuthenticationError(
          "You are not logged into the correct account for this invite."
        );
      }
      // TODO ends here

      if (doctor) {
        if (patient) {
          await doctor.addPatient(patient);
          await patient.addDoctor(doctor);
          return true;
        }
        throw new ApolloError("Invalid patient", 400);
      }
      throw new ApolloError("Invalid doctor!", 400);
    },
  },
};
