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
      const doctor = await new Doctor({
        ...user_details,
      }).save();

      return { ...doctor.dataValues };
    },
  },
};
