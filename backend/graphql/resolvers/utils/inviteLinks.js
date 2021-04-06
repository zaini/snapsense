const {
  ApolloError,
  UserInputError,
  AuthenticationError,
} = require("apollo-server");
const { verify } = require("jsonwebtoken");
const isAuth = require("../../../utils/isAuth");
const { createAccessToken } = require("./authTokens");
const { Admin, Doctor, Patient } = require("../../../models/index");
require("dotenv").config({ path: "../.env" });
const transactionalEmailSender = require("../../../utils/transactionalEmailSender");

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL;

const sendInviteEmail = async (inviteToken, user, email) => {
  // Set invite token URL for attaching in email
  const inviteUrl = `${FRONTEND_URL}/invites/show/${inviteToken}`;

  // Set email parameters for the template
  const htmlParams = {
    inviter: user.email,
    newAccount: email,
    url: inviteUrl,
  };

  // set User specific template params
  switch (user.accountType) {
    case "ADMIN":
      //Admin is inviting a doctor
      htmlParams.by = "Admin";
      htmlParams.for = "Doctor";

      break;
    case "DOCTOR":
      //Doctor is inviting a patient
      htmlParams.by = "Doctor";
      htmlParams.for = "Patient";

      break;
    default:
      throw new ApolloError("Invalid invite request for MX Server", 400);
      break;
  }

  // Set essential email parameters
  const emailParams = {
    to: email,
    subject: "Snapsense Account Invitation",
    altbody: inviteUrl,
    template: "invite",
    status: 0,
  };

  // Insert bundled email params into model
  await transactionalEmailSender(emailParams, htmlParams);
};

module.exports = {
  Query: {
    checkInvitation: async (_, { invitationToken }) => {
      try {
        let {
          inviterEmail,
          newAccountEmail,
          accountType,
          accountExists,
        } = verify(invitationToken, ACCESS_TOKEN_SECRET_KEY);

        inviterEmail = inviterEmail.toLowerCase();
        newAccountEmail = newAccountEmail.toLowerCase();

        let doctor;
        switch (accountType) {
          case "DOCTOR":
            const admin = await Admin.findOne({
              where: { email: inviterEmail },
            });

            if (!admin) {
              throw new ApolloError("Inviter no longer exists!", 400);
            }

            doctor = await Doctor.findOne({
              where: { email: newAccountEmail },
            });

            if (doctor) {
              throw new ApolloError("You already have an account!", 400);
            }
            break;

          case "PATIENT":
            doctor = await Doctor.findOne({
              where: { email: inviterEmail },
            });

            if (!doctor) {
              throw new ApolloError("Inviter no longer exists!", 400);
            }

            const patient = await Patient.findOne({
              where: { email: newAccountEmail },
            });
            if (patient && (await patient.hasDoctor(doctor))) {
              throw new UserInputError(
                "You are already registered with this doctor!"
              );
            }
            accountExists = !!patient;
            break;
          default:
						throw new ApolloError("Invalid Account Type!", 400);
            break;
        }
        return createAccessToken(
          {
            inviterEmail,
            newAccountEmail,
            accountType,
            accountExists,
          },
          "7d"
        );
      } catch (error) {
        throw new AuthenticationError(error);
      }
    },
  },
  Mutation: {
    inviteUser: async (_, { email }, context) => {
      // Get the user and their email from the authorization header token

      // Logged in User
      const user = isAuth(context);
      const userEmail = user.email.toLowerCase();
      email = email.toLowerCase();

      let accountType, doctor;
      let accountExists = false;

      switch (user.accountType) {
        case "ADMIN":
          accountType = "DOCTOR";
          // Check if JWT admin exists
          const admin = await Admin.findByPk(user.id);
          if (!admin) {
            throw new ApolloError("Invalid user", 400);
          }

          //Check for NHS email
          // TODO: use validator class
          const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@nhs.net$/;
          if (!re.test(String(email).trim())) {
            throw new UserInputError("Only NHS email recipients allowed");
          }

          // Check if doctor exists
          doctor = await Doctor.findOne({ where: { email } });
          if (doctor) {
            throw new ApolloError("Invalid recipient", 400);
          }
          break;
        case "DOCTOR":
          accountType = "PATIENT";

          // Check if JWT doctor exists
          doctor = await Doctor.findByPk(user.id);
          if (!doctor) {
            throw new ApolloError("Invalid user", 400);
          }

          const patient = await Patient.findOne({ where: { email } });
          if (patient && (await patient.hasDoctor(doctor))) {
            throw new UserInputError(
              "This patient is already registered with you"
            );
          }

          accountExists = !!patient;
          break;
        default:
          throw new ApolloError("Invalid invite request", 400);
          break;
      }

      const inviteTokenParams = {
        inviterEmail: userEmail,
        newAccountEmail: email,
        accountType,
        accountExists,
      };

      const inviteToken = createAccessToken(inviteTokenParams, "7d");

      await sendInviteEmail(inviteToken, user, email);

      return inviteToken;
    },
  },
};
