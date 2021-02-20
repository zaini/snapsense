const { Admin } = require("../../models/index.js");

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
  Mutation: {},
};
