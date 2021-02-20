const argon2 = require("argon2");
const { UserInputError, ApolloError } = require("apollo-server");
const { verify } = require("jsonwebtoken");
require("dotenv").config();

const { createAccessToken } = require("../utils/authTokens");
const { Admin, Doctor, Patient } = require("../../../models/index");
const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;

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
      let doctor;

      switch (accountType) {
        case "DOCTOR":
          const admin = await Admin.findOne({
            where: { email: inviterEmail },
          });
          doctor = await Doctor.findOne({
            where: { email: newAccountEmail },
          });
          if (admin) {
            // admin exists
            if (!doctor) {
              // Doctor is a new doctor
              doctor = await new Doctor({
                fname,
                lname,
                password: hashedPassword,
                email: newAccountEmail,
                admin_id: admin.getDataValue("id"),
              }).save();

              return true; // New doctor has been created successfully
            } else {
              // This doctor already exists
              throw new ApolloError("Invalid credentials", 400);
            }
          } else {
            // Invalid admin
            throw new ApolloError("Invalid invitation", 400);
          }
          break;

        case "PATIENT":
          doctor = await Doctor.findOne({
            where: { email: inviterEmail },
          });
          let patient = await Patient.findOne({
            where: { email: newAccountEmail },
          });
          if (doctor) {
            // doctor exists
            if (!patient) {
              // Patient does not exist
              patient = await new Patient({
                fname,
                lname,
                password: hashedPassword,
                email: newAccountEmail,
              }).save();

              // Add the relationship between the doctor and patient
              await doctor.addPatients(patient);
              await patient.addDoctors(doctor);

              return true;
            } else {
              // This patient exists
              throw new ApolloError("Invalid credentials", 400);
            }
          } else {
            // Invalid doctor
            throw new ApolloError("Invalid invitation", 400);
          }
          break;

        default:
          throw new ApolloError("Invalid invitation", 400);
          break;
      }
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
          ...user,
          accountType: account_type,
        }),
      };
    },
  },
};
