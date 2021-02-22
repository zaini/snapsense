const { Doctor } = require("../../models/index.js");
const argon2 = require("argon2");

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

      const doctor = await new Doctor({
        ...user_details,
        password: hashedPassword,
        createdAt: new Date(),
      }).save();

      return { ...doctor.dataValues };
    },
  },
};
