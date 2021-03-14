const {
  ApolloError,
  UserInputError,
  AuthenticationError,
} = require("apollo-server");
const { verify } = require("jsonwebtoken");

const isAuth = require("../../../utils/isAuth");
const { createAccessToken } = require("./authTokens");
const {
  Admin,
  Doctor,
  Patient,
  ScheduledEmail,
} = require("../../../models/index");
require("dotenv").config();

const JSONToString = require("../../../utils/jsonProvider/string.js");
const enqueueEmail = require("../../../utils/scheduledEmail");

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;

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

      const user = isAuth(context);
      const userEmail = user.email;

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

      // ADMIN CASES:
      // If admin sends request to an existing doctor, throw an error (DONE)
      // If admin sends request to a new doctor, render invite/:id (CLIENT SIDE)
      // If admin sends request to a new doctor, and after that doctor registers and clicks on the link again, render error page (CLIENT/BACKEND SIDE)

      // DOCTOR CASES:
      // Doctor -> new patient => render invite/:id
      // If doctors sends request to a new patient, and after that patient registers and clicks on the link again, render error page
      // Doctor -> existing patient => frontend sends a backend request creating the relation, then take user to home page
      // If doctor and patient are already related, don't do anything => render home/profile page
      const inviteTokenParams = {
        inviterEmail: userEmail,
        newAccountEmail: email,
        accountType,
        accountExists,
      };

      const inviteToken = createAccessToken(inviteTokenParams, "7d");

      // Set invite token URL for attaching in email
      const inviteUrl = "http://localhost:3000/invites/show/" + inviteToken;

      // Set email parameters for the template
      const htmlParams = {
        inviter: userEmail,
        newAccount: email,
        url: inviteUrl,
        by: "",
        for: "",
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

      // convert Json html params to String
      const jsonHtmlContents = JSONToString(htmlParams);

      // Set essential email parameters
      const emailParams = {
        to: email,
        subject: "Snapsense Account Invitation",
        html: jsonHtmlContents,
        altbody: inviteUrl,
        template: "invite",
        status: 0,
      };

      // Insert bundled email params into model
      await enqueueEmail(emailParams);

      return inviteToken;
    },
  },
};
