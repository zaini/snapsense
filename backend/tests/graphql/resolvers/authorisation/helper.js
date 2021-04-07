// File containing helper post requests for the authorisation testing

require("dotenv").config({ path: "../../../../../.env" });
const request = require("supertest");
const { sign } = require("jsonwebtoken");

const app = require("../../../../index");

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;

const loginRequest = (email, password, accountType) => {
  return request(app)
    .post("/graphql")
    .send({
      query: `
			mutation {
				login(
					email: "${email}"
					password: "${password}"
					account_type: "${accountType}"
				) {
					accessToken
				}
			}
		`,
    });
};

const registerUser = (
  inviterEmail,
  newAccountEmail,
  accountType,
  duration = "2h"
) => {
  return sign(
    {
      inviterEmail,
      newAccountEmail,
      accountType,
    },
    ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: duration,
    }
  );
};

const registerRequest = (
  { fname, lname, password, passwordConfirmation },
  invitationToken
) => {
  return request(app)
    .post("/graphql")
    .send({
      query: `
				mutation {
					register(
						fname: "${fname}"
						lname: "${lname}"
						password: "${password}"
						passwordConfirmation: "${passwordConfirmation}"
						invitationToken: "${invitationToken}"
					)
				}
			`,
    });
};

module.exports = {
  loginRequest,
  registerUser,
  registerRequest,
};
