const { AuthenticationError, UserInputError } = require("apollo-server-core");
const { SuperAdmin, Admin, Hospital } = require("../../models/index.js");

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
    getAdmins: async (_, __, context) => {
      const admin = await getAuthenticatedAdmin(context);

      try {
        const admins = await Admin.findAll();
        return admins;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    createAdmin: async (_, user_details, context) => {
      const admin = await getAuthenticatedAdmin(context);

      const hospital = await Hospital.findByPk(user_details.hospital_id);

      if (!hospital) {
        throw new UserInputError(
          "The hospital for this account does not exist."
        );
      }

      try {
        const admin = await new Admin({
          ...user_details,
        }).save();
        return { ...admin.dataValues };
      } catch (error) {
        throw new UserInputError(
          "This account does not have proper validation. e.g. email might already be in use or password is too weak."
        );
      }
    },
  },
};
