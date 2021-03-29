const { UserInputError } = require("apollo-server");
const argon2 = require("argon2");

const { Admin, Doctor, Patient, SuperAdmin } = require("../../../models/index");
const isAuth = require("../../../utils/isAuth.js");

const getUser = async (userContext) => {
  let user = isAuth(userContext);
  switch (user.accountType) {
    case "SUPERADMIN":
      user = await SuperAdmin.findByPk(user.id);
      break;
    case "ADMIN":
      user = await Admin.findByPk(user.id);
      break;
    case "DOCTOR":
      user = await Doctor.findByPk(user.id);
      break;
    case "PATIENT":
      user = await Patient.findByPk(user.id);
      break;
    default:
      throw new UserInputError("Invalid user type!");
      break;
  }
  return user;
};

module.exports = {
  Query: {},
  Mutation: {
    changePassword: async (_, { password, password_confirmation }, context) => {
      if (password !== password_confirmation) {
        throw new UserInputError("Password must match password confirmation!");
      }
      const user = await getUser(context);

      await user.update({
        password,
      });

      return true;
    },
    deleteAccount: async (_, { password, password_confirmation }, context) => {
      if (password !== password_confirmation) {
        throw new UserInputError("Password must match password confirmation!");
      }

      const user = await getUser(context);

      if (await argon2.verify(user.password, password)) {
        // Password matched
        await user.destroy();
        return true;
      }

      throw new UserInputError("Incorrect password!");
    },
  },
};
