const argon2 = require("argon2");
const { sign } = require("jsonwebtoken");
require("dotenv").config();

const { Admin, Doctor, Patient } = require("../../../models/index");

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;
const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;

module.exports = {
  Query: {},
  Mutation: {
    register: async (_, user_details) => {
      const { fname, lname, email, password, account_type } = user_details;
      const basic_user_details = { fname, lname, email };

      const hashedPassword = await argon2.hash(password);

      let user;
      switch (account_type) {
        case "admin":
          user = new Admin({
            ...basic_user_details,
            password: hashedPassword,
            hospital_id: user_details.hospital_id,
            createdAt: new Date(),
          });
          break;
        case "doctor":
          user = new Doctor({
            ...basic_user_details,
            password: hashedPassword,
            admin_id: user_details.admin_id,
            createdAt: new Date(),
          });
          break;
        case "patient":
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
    login: async (_, user_details, { res }) => {
      const { email, password, account_type } = user_details;

      let user;
      switch (account_type) {
        case "admin":
          user = await Admin.findOne({ where: { email: email } });
          break;
        case "doctor":
          user = await Doctor.findOne({ where: { email: email } });

          break;
        case "patient":
          user = await Patient.findOne({ where: { email: email } });
          break;
        default:
          break;
      }

      if (!user) {
        throw new Error("Invalid user login details");
      }

      const valid_password = await argon2.verify(user.password, password);

      if (!valid_password) {
        throw new Error("Invalid password");
      }

      // console.log("Correct user details");

      // This is the refresh token, which is stored in the cookie
      res.cookie(
        "jid",
        sign(
          { id: user.id, accountType: account_type },
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
          { id: user.id, accountType: account_type },
          ACCESS_TOKEN_SECRET_KEY,
          {
            expiresIn: "30m",
          }
        ),
      };
    },
  },
};
