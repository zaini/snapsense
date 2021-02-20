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
    createAdmin: async (_, user_details) => {
      const hashedPassword = await argon2.hash(user_details.password);

      const admin = new Admin({
        ...user_details,
        password: hashedPassword,
        createdAt: new Date(),
      });

      return { ...admin.save(), role: "admin" };
    },
  },
};
