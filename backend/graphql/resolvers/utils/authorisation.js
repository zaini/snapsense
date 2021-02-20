const argon2 = require("argon2");
require("dotenv").config();
const { UserInputError } = require("apollo-server");

const { createAccessToken } = require("../utils/authTokens");
const { Admin, Doctor, Patient } = require("../../../models/index");

module.exports = {
  Query: {},
  Mutation: {
    register: async (_, user_details) => {
      const { fname, lname, email, password, account_type } = user_details;
      const basic_user_details = { fname, lname, email };

      const hashedPassword = await argon2.hash(password);

      let user;
      switch (account_type) {
        case "ADMIN":
          user = new Admin({
            ...basic_user_details,
            password: hashedPassword,
            hospital_id: user_details.hospital_id,
            createdAt: new Date(),
          });
          break;
        case "DOCTOR":
          user = new Doctor({
            ...basic_user_details,
            password: hashedPassword,
            admin_id: user_details.admin_id,
            createdAt: new Date(),
          });
          break;
        case "PATIENT":
          user = new Patient({
            ...basic_user_details,
            password: hashedPassword,
            createdAt: new Date(),
          });
          break;
        default:
          break;
      }

      try {
        user.save();
      } catch (error) {
        console.log(error);
        return false;
      }

      return true;
    },
    login: async (_, user_details) => {
      const { email, password, account_type } = user_details;

      let user;
      switch (account_type) {
        case "ADMIN":
          user = await Admin.findOne({ where: { email: email } });
          break;
        case "DOCTOR":
          user = await Doctor.findOne({ where: { email: email } });

          break;
        case "PATIENT":
          user = await Patient.findOne({ where: { email: email } });
          break;
        default:
          break;
      }

      const userInvalidError = "Invalid Login Credentials. Please try again!";

      if (!user) {
        throw new UserInputError(userInvalidError);
      }

      const valid_password = await argon2.verify(user.password, password);

      if (!valid_password) {
        throw new UserInputError(userInvalidError);
      }

      // This is the actual token, not stored in the cookie.
      return {
        accessToken: createAccessToken({
          ...user,
          accountType: account_type,
        }),
      };
    },
  },
};
