const { Admin } = require("../../models/index.js");
const argon2 = require("argon2");

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
    createAdmin: async (_, admin_details) => {
      const hashedPassword = await argon2.hash(admin_details.password);

      const admin = new Admin({
        ...admin_details,
        password: hashedPassword,
        createdAt: new Date(),
      });

      return { ...admin.save(), role: "admin" };
    },
  },
};
