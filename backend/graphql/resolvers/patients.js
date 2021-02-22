const { ApolloError } = require("apollo-server");
const argon2 = require("argon2");

const { Doctor, Patient } = require("../../models/index.js");

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
    createPatient: async (_, user_details) => {
      const hashedPassword = await argon2.hash(user_details.password);

      const patient = await new Patient({
        ...user_details,
        password: hashedPassword,
        createdAt: new Date(),
      }).save();

      return { ...patient.dataValues };
    },
    addPatientToDoctor: async (_, { patient_email, doctor_email }) => {
      const doctor = await Doctor.findOne({ where: { email: doctor_email } });
      const patient = await Patient.findOne({
        where: { email: patient_email },
      });

      if (doctor) {
        if (patient) {
          await doctor.addPatient(patient);
          await patient.addPatient(doctor);
          return true;
        }
        throw new ApolloError("Invalid patient", 400);
      }
      throw new ApolloError("Invalid doctor!", 400);
    },
  },
};
