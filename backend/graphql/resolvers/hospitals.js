const { Hospital } = require("../../models/index.js");

module.exports = {
  Query: {
    getHospitals: async () => {
      try {
        const hospitals = await Hospital.findAll();
        return hospitals;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    createHospital: async (_, hospital_details) => {
      const hospital = new Hospital({
        ...hospital_details,
        createdAt: new Date(),
      });
      return hospital.save();
    },
  },
};
