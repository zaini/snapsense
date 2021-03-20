const { AuthenticationError, UserInputError } = require("apollo-server");

const { Hospital, SuperAdmin } = require("../../models/index.js");
const isAuth = require("../../utils/isAuth.js");

const getAuthenticatedSuperAdmin = async (context) => {
  // Get the user based on the context
  const user = isAuth(context);

  // Make sure user is a super admin
  if (user.accountType !== "SUPERADMIN") {
    throw new AuthenticationError("Invalid user account type!");
  }

  // Make sure the super admin is 'real' (i.e. in the db)
  const superAdmin = await SuperAdmin.findByPk(user.id);
  if (!superAdmin) {
    throw new AuthenticationError("Invalid user!");
  }

  return superAdmin;
};

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
      if(!hospital) {
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
        throw new UserInputError("Hospital does not exist") 
      }

      await hospital.destroy();

      return true;
    },
  },
};
