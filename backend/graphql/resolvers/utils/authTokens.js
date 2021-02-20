const { sign } = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;
const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;

module.exports = {
  createAccessToken: (data) => {
    return sign({ ...data }, ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: "30m",
    });
  },
  createRefreshToken: (data) => {
    return sign({ ...data }, REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: "90d",
    });
  },
};
