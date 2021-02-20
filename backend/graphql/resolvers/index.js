const argon2 = require("argon2");
require("dotenv").config();

const { Patient } = require("../../models/index.js");
const { sign, verify } = require("jsonwebtoken");
const isAuth = require("../../utils/isAuth");

const hospitalResolvers = require("./hospitals");
const adminResolvers = require("./admins");
const doctorResolvers = require("./doctors");
const patientResolvers = require("./patients");
const submissionResolvers = require("./submissions");
const imageResolvers = require("./images");

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;
const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;

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
          REFRESH_TOKEN_SECRET_KEY,
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
          ACCESS_TOKEN_SECRET_KEY,
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
    onlyPatients: (_, __, { req, res, payload }) => {
      const authorization = req.headers["authorization"];

      if (!authorization) {
        throw new Error("Not authenticated");
      }

      try {
        const token = authorization.split(" ")[1];
        console.log("token", token);
        const new_payload = verify(token, ACCESS_TOKEN_SECRET_KEY);
        payload = new_payload;
        console.log(payload);
      } catch (error) {
        throw new Error(error);
      }

      return `it works! your id is ${payload.id} and yoru account type is ${payload.accountType}`;
    },
  },
};
