const { Patient } = require("../../models/index.js");

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

      const patient = new Patient({
        ...user_details,
        password: hashedPassword,
        createdAt: new Date(),
      });

      return { ...patient.save(), role: "patient" };
    },
  },
};
