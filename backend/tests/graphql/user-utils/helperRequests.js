const request = require("supertest");

const app = require("../../../index");

export const deleteAccountRequest = (password, passwordConfirmation, token) => {
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

export const changePasswordRequest = (password, passwordConfirmation, token) => {
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
