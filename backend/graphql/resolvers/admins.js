const { UserInputError } = require("apollo-server-core");
const { Admin, Hospital } = require("../../models/index.js");

module.exports = {
  Query: {
    getAdmins: async () => {
      try {
        const admins = await Admin.findAll();
        return admins;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    createAdmin: async (_, user_details) => {
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
