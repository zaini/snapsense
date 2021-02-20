const { Doctor } = require("../../models/index.js");

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
  },
  Mutation: {
    createDoctor: async (_, user_details) => {
      const hashedPassword = await argon2.hash(user_details.password);

      const doctor = new Doctor({
        ...user_details,
        password: hashedPassword,
        createdAt: new Date(),
      });

      return { ...doctor.save(), role: "doctor" };
    },
  },
};
