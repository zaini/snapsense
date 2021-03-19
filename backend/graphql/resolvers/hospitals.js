const { AuthenticationError, UserInputError } = require("apollo-server");

const { Hospital, SuperAdmin } = require("../../models/index.js");
const isAuth = require("../../utils/isAuth.js");

const getAuthenticatedAdmin = async (context) => {
  // Get the user based on the context
  const user = isAuth(context);

  // Make sure user is a super admin
  if (user.accountType !== "SUPERADMIN") {
    throw new AuthenticationError("Invalid user account type!");
  }

  // Make sure the super admin is 'real' (i.e. in the db)
  const admin = await SuperAdmin.findByPk(user.id);
  if (!admin) {
    throw new AuthenticationError("Invalid user!");
  }

  return admin;
};

module.exports = {
  Query: {
    getHospitals: async (_, __, context) => {
      // Authenticate the super admin
      const admin = getAuthenticatedAdmin(context);

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
      const admin = getAuthenticatedAdmin(context);

      // Get specific hospital
      try {
        const hospital = await Hospital.findByPk(hospital_id);
        return hospital;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    createHospital: async (_, hospital_details, context) => {
      // Authenticate the super admin
      const admin = getAuthenticatedAdmin(context);

      // Create the hospital
      const hospital = await new Hospital({
        ...hospital_details,
        createdAt: new Date(),
        updatedAt: new Date(),
      }).save();

      return hospital;
    },
  },
};
