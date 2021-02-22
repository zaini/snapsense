const argon2 = require("argon2");
const { UserInputError, ApolloError } = require("apollo-server");
const { verify } = require("jsonwebtoken");
require("dotenv").config();

const { createAccessToken } = require("../utils/authTokens");
const { Admin, Doctor, Patient } = require("../../../models/index");
const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;

// Make sure the the inviter exists and the invited email account does not exist
const isInvitationValid = async (inviter, invited) => {
  if (inviter) {
    if (!invited) {
      return true;
    }
    throw new ApolloError("Account exists!", 400);
  }
  throw new ApolloError("Invalid invitation", 400);
};

module.exports = {
  Query: {},
  Mutation: {
    register: async (_, user_details) => {
      const { fname, lname, password, invitationToken } = user_details;
      const { inviterEmail, newAccountEmail, accountType } = verify(
        invitationToken,
        ACCESS_TOKEN_SECRET_KEY
      );
      const hashedPassword = await argon2.hash(password);
      let inviter, invited, user;

      switch (accountType) {
        case "DOCTOR":
          inviter = await Admin.findOne({ where: { email: inviterEmail } });
          invited = await Doctor.findOne({ where: { email: newAccountEmail } });
          user = new Doctor({
            fname,
            lname,
            password: hashedPassword,
            email: newAccountEmail,
            admin_id: inviter.getDataValue("id"),
          });
          break;

        case "PATIENT":
          inviter = await Doctor.findOne({ where: { email: inviterEmail } });
          invited = await Patient.findOne({ where: { email: newAccountEmail } });
          user = new Patient({
            fname,
            lname,
            password: hashedPassword,
            email: newAccountEmail,
          });
          break;

        default:
          throw new ApolloError("Invalid invitation", 400);
          break;
      }

      const valid = await isInvitationValid(inviter, invited);
      if (valid) {
        await user.save();
        if (user instanceof Patient) {
          // This is the only many to many relationship that requires this constraint, so checking instanceof is fine
          await inviter.addPatients(user);
          await user.addDoctors(inviter);
        }
        return true;
      }

      // This will never be reached because isInvitationValid either throws an error or returns true,
      // but just in case the implementation changes. This is a form of defensive programming.
      return false;
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
          // Account type is invalid
          throw new ApolloError("Malformed expression", 400);
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
          ...user.dataValues,
          accountType: account_type,
        }),
      };
    },
  },
};
