// File containing helper post requests for the authorisation testing

const request = require("supertest");

const app = require("../../index");

export const loginRequest = (email, password, accountType) => {
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
