const argon2 = require("argon2");

const { Patient } = require("../../models/index.js");
const { sign } = require("jsonwebtoken");

const hospitalResolvers = require("./hospitals");
const adminResolvers = require("./admins");
const doctorResolvers = require("./doctors");
const patientResolvers = require("./patients");
const submissionResolvers = require("./submissions");
const imageResolvers = require("./images");

module.exports = {
  Mutation: {
    ...hospitalResolvers.Mutation,
    ...adminResolvers.Mutation,
    ...doctorResolvers.Mutation,
    ...patientResolvers.Mutation,
    ...submissionResolvers.Mutation,
    ...imageResolvers.Mutation,
    registerPatient: async (_, user_details) => {
      const { fname, lname, email, password } = user_details;
      const hashedPassword = await argon2.hash(password);

      const patient = new Patient({
        ...user_details,
        password: hashedPassword,
        createdAt: new Date(),
      });

      try {
        patient.save();
      } catch (error) {
        console.log(error);
        return false;
      }

      return true;
    },

    loginPatient: async (_, user_details, { res }) => {
      const { email, password } = user_details;
      const patient = await Patient.findOne({ where: { email: email } });

      if (!patient) {
        throw new Error("Invalid patient login details");
      }

      const valid_password = await argon2.verify(patient.password, password);

      if (!valid_password) {
        throw new Error("Invalid password");
      }

      console.log("Correct patient details");
      // console.log(patient);

      // This is the refresh token, which is stored in the cookie
      res.cookie(
        "jid",
        sign(
          { id: patient.id, accountType: "patient" },
          "anothersecrettokenkey",
          {
            expiresIn: "90d",
          }
        ),
        {
          htmlOnly: true,
        }
      );

      // This is the actual token, not stored in the cookie.
      return {
        accessToken: sign(
          { id: patient.id, accountType: "patient" },
          "secrettokenkey",
          {
            expiresIn: "30m",
          }
        ),
      };
    },
  },

  Query: {
    ...hospitalResolvers.Query,
    ...adminResolvers.Query,
    ...doctorResolvers.Query,
    ...patientResolvers.Query,
    ...submissionResolvers.Query,
    ...imageResolvers.Query,
  },
};
