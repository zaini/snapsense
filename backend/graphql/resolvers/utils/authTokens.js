const { sign } = require("jsonwebtoken");
require("dotenv").config();

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;

module.exports = {
  createAccessToken: (data, duration = "30m") => {
    return sign({ ...data }, ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: duration,
    });
  },
};
