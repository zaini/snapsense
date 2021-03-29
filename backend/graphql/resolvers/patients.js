const {
  ApolloError,
  AuthenticationError,
  UserInputError,
} = require("apollo-server");
const { Doctor, Patient } = require("../../models/index.js");
const { getDoctorById, getPatientById } = require("./utils/userAuthorisation");

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
    getPatientsAsDoctor: async (_, {}, context) => {
      const user = isAuth(context);

      if (user.accountType !== "DOCTOR") {
        throw new AuthenticationError(
          "You are not logged into the correct account for this feature."
        );
      }

      const doctor = await getDoctorById(user.id);

      const patients = await doctor.getPatients();

      return patients || [];
    },
    getPatientAsDoctor: async (_, { patient_id }, context) => {
      const user = isAuth(context);

      // Authenticate doctor
      if (!user.accountType || user.accountType !== "DOCTOR") {
        throw new AuthenticationError("Invalid user credentials!");
      }

      const doctor = await getDoctorById(user.id);
      const patient = await getPatientById(patient_id);

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

      const user = isAuth(context);
      const { email, accountType } = user;

      if (!(accountType === "PATIENT" && email === patient_email)) {
        throw new AuthenticationError(
          "You are not logged into the correct account for this invite."
        );
      }

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
