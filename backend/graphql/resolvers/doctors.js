const { AuthenticationError, UserInputError } = require("apollo-server-core");
const { Patient, Doctor, Hospital } = require("../../models/index.js");
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

    //query to get all doctors from admin's hospital
    getDoctorsByHospital: async (_, __, context) => {
      const user = isAuth(context);

      // Allow only admins
      if (user.accountType !== "ADMIN") {
        throw new AuthenticationError(
          "You are not logged into the correct account for this feature."
        );
      }

      // Get the hospital and check it exists
      const hospital = await Hospital.findByPk(user.hospital_id);

      if(!hospital) {
        throw new UserInputError("Invalid hospital")
      }

      const doctors = await hospital.getDoctors();
      return doctors || []; // doctors might be null, so return empty array
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
      if(await doctor.hasPatient(patient)) {
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
  Mutation: {},
};
