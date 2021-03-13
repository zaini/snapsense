const { ApolloError, AuthenticationError } = require("apollo-server");
const {
  Doctor,
  Patient,
  Doctor_Patient_Relation,
} = require("../../models/index.js");
const sequelize = require("../../models/index.js");
const patient = require("../../models/patient.js");
const isAuth = require("../../utils/isAuth");

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
    getPatientsByDoctor: async (_, {}, context) => {
      const user = isAuth(context);

      if (!(user.accountType === "DOCTOR")) {
        throw new AuthenticationError(
          "You are not logged into the correct account for this feature."
        );
      }

      try {
        const doctor = await Doctor.findOne({ where: { id: user.id } });
        const patients = await doctor.getPatients();

        return patients;
      } catch (error) {
        throw new Error(error);
      }
    },
    getPatientByDoctor: async (_, { patient_id }, context) => {
      const user = isAuth(context);

      // Authenticate doctor
      if (!user.accountType || user.accountType !== "DOCTOR") {
        throw new AuthenticationError("Invalid user credentials!");
      }

      // Get the doctor and make sure they exist
      const doctor = await Doctor.findByPk(user.id);
      if (!doctor) {
        throw new UserInputError("Invalid user!");
      }

      // Get the patient and make sure they exist
      const patient = await Patient.findByPk(patient_id);
      if (!patient) {
        throw new UserInputError("Invalid patient!");
      }

      // If the patient belongs to the doctor, return the patient
      if (await doctor.hasPatient(patient)) {
        return {
          id: patient.id,
          fname: patient.fname,
          lname: patient.lname,
          email: patient.email,
          createdAt: patient.createdAt,
        };
      }

      // Patient does not belong to doctor, throw error
      throw new UserInputError("Invalid patient!");
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
