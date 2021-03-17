const { sign } = require("jsonwebtoken");
require("dotenv").config();

const { ApolloError } = require("apollo-server");

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;

module.exports = {
  createAccessToken: (data, duration = "30m") => {
    try {
      return sign({ ...data }, ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: duration,
      });
    } catch (error) {
      throw new ApolloError("Internal Token Error", 500);
    }
  },
};
