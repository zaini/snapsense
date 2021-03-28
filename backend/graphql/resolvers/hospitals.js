const { UserInputError } = require("apollo-server");

const { Hospital } = require("../../models/index.js");
const {
  getAuthenticatedSuperAdmin,
} = require("./utils/superadminAuthorisation");

module.exports = {
  Query: {
    getHospitals: async (_, __, context) => {
      // Authenticate the super admin
      const superAdmin = await getAuthenticatedSuperAdmin(context);

      // Get all hospitals
      try {
        const hospitals = await Hospital.findAll();
        return hospitals;
      } catch (error) {
        throw new Error(error);
      }
    },
    getSpecificHospital: async (_, { hospital_id }, context) => {
      // Authenticate the super admin
      const superAdmin = await getAuthenticatedSuperAdmin(context);

      // Get specific hospital
      const hospital = await Hospital.findByPk(hospital_id);
      if (!hospital) {
        throw new UserInputError("Hospital does not exist");
      }
      return hospital;
    },
  },
  Mutation: {
    createHospital: async (_, hospital_details, context) => {
      // Authenticate the super admin
      const superAdmin = await getAuthenticatedSuperAdmin(context);

      // Create the hospital
      const hospital = await new Hospital({
        ...hospital_details,
        createdAt: new Date(),
        updatedAt: new Date(),
      }).save();

      return hospital;
    },
    deleteHospital: async (_, { hospital_id }, context) => {
      // Authenticate the super admin
      const superAdmin = await getAuthenticatedSuperAdmin(context);

      // Create the hospital
      const hospital = await Hospital.findByPk(hospital_id);

      if (!hospital) {
        throw new UserInputError("Hospital does not exist");
      }

      await hospital.destroy();

      return true;
    },
  },
};
