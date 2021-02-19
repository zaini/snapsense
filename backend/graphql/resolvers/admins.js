const { Admin } = require("../../models/index.js");

module.exports = {
  Query: {
    async getAdmins() {
      try {
        const admins = await Admin.findAll();
        return admins;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    
  },
};
