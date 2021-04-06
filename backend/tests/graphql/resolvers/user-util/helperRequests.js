// File containing helper post requests for the user util testing
// Util functionality includes password change or account deletion

const request = require("supertest");

const app = require("../../../../index");

const deleteAccountRequest = (password, passwordConfirmation, token) => {
  return request(app)
    .post("/graphql")
    .send({
      query: `
			mutation {
				deleteAccount(password: "${password}", password_confirmation: "${passwordConfirmation}")
			}			
		`,
    })
    .set("authorization", `Bearer ${token}`);
};

const changePasswordRequest = (password, passwordConfirmation, token) => {
  return request(app)
    .post("/graphql")
    .send({
      query: `
			mutation {
				changePassword(password: "${password}", password_confirmation: "${passwordConfirmation}")
			}			
		`,
    })
    .set("authorization", `Bearer ${token}`);
};

module.exports = {
  deleteAccountRequest,
  changePasswordRequest,
};
