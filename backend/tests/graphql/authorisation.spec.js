const request = require("supertest");
const { verify } = require("jsonwebtoken");
require("dotenv").config({ path: "../../../.env" });

const app = require("../../index");
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

describe("authorisation resolver", () => {

  test("should login as a patient with valid credentials", async (done) => {
    const response = await loginRequest(
      "patient1@gmail.com",
      "Password123",
      "PATIENT"
    );

		// Get the response token
    const {
      body: {
        data: {
          login: { accessToken },
        },
      },
    } = response;

		// Verify and decode the token
    const result = verify(accessToken, ACCESS_TOKEN_SECRET_KEY);

		// Make sure the token contains the correct data, cannot check for full object equality due to timestamps
		expect(result).toEqual(expect.objectContaining({
      accountType: "PATIENT",
      email: "patient1@gmail.com",
      fname: "Patient",
      lname: "One",
    }));

    done();
  });

	test("should not login as a patient with an invalid password", async (done) => {
    const response = await loginRequest(
      "patient1@gmail.com",
      "Password1234",
      "PATIENT"
    );

		// Throws error due to invalid password
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Invalid Login Credentials. Please try again!");

    done();
  });

	test("should not login as a patient with an invalid email (i.e. non-existing account)", async (done) => {
    const response = await loginRequest(
      "invalidpatient@gmail.com",
      "Password1234",
      "PATIENT"
    );

		// Throws error due to invalid password
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Invalid Login Credentials. Please try again!");

    done();
  });

	test("should not login as a patient with an incorrect account type but valid credentials", async (done) => {
    const response = await loginRequest(
      "patient1@gmail.com",
      "Password123",
      "DOCTOR"
    );

		// Throws error due to invalid password
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Invalid Login Credentials. Please try again!");

    done();
  });
});
