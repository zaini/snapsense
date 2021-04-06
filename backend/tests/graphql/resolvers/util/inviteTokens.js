require("dotenv").config({ path: "../../../../../.env" });

const { sign } = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;

const inviteToken = (
  inviterEmail,
  newAccountEmail,
  accountType,
  accountExists,
  duration = "2h"
) => {
  return sign(
    {
      inviterEmail,
      newAccountEmail,
      accountType,
      accountExists,
    },
    ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: duration,
    }
  );
};

module.exports = {
  inviteToken,
};
