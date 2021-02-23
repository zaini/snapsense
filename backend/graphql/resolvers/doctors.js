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
  Mutation: {},
};
