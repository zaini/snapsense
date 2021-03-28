const { UserInputError } = require("apollo-server");

const { Admin, Hospital } = require("../../models/index.js");
const {
  getAuthenticatedSuperAdmin,
} = require("./utils/superadminAuthorisation");

module.exports = {
  Query: {
    getAdmins: async (_, __, context) => {
      const superAdmin = await getAuthenticatedSuperAdmin(context);

      try {
        const admins = await Admin.findAll({
          include: Hospital,
        });
        return admins;
      } catch (error) {
        throw new Error(error);
      }
    },
    getAdminById: async (_, { admin_id }, context) => {
      const superAdmin = await getAuthenticatedSuperAdmin(context);

      const admin = await Admin.findByPk(admin_id, {
        include: Hospital,
      });

      if (!admin) {
        throw new UserInputError("Admin does not exist!");
      }

      return admin;
    },
  },
  Mutation: {
    createAdmin: async (_, user_details, context) => {
      const superAdmin = await getAuthenticatedSuperAdmin(context);

      const hospital = await Hospital.findByPk(user_details.hospital_id);

      if (!hospital) {
        throw new UserInputError("This hospital does not exist.");
      }

      try {
        const admin = await new Admin({
          ...user_details,
        }).save();
        return {
          fname: admin.fname,
          lname: admin.lname,
          email: admin.email,
          createdAt: admin.createdAt,
        };
      } catch (error) {
        throw new UserInputError(
          "This account does not have proper validation. e.g. email might already be in use or password is too weak."
        );
      }
    },
    deleteAdmin: async (_, { admin_id }, context) => {
      const superAdmin = await getAuthenticatedSuperAdmin(context);

      const admin = await Admin.findByPk(admin_id);

      if (!admin) {
        throw new UserInputError("This admin does not exist.");
      }

      try {
        await admin.destroy();
        return true;
      } catch (error) {
        throw new UserInputError(
          "Something went wrong, please try again later or contact the system administrator!"
        );
      }
    },
  },
};
