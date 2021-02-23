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
  Mutation: {},
};
