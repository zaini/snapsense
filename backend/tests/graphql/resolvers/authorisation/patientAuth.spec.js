require("dotenv").config({ path: "../../../../../.env" });
const { verify } = require("jsonwebtoken");

const {
  loginRequest,
  registerUser,
  registerRequest,
} = require("./helper");

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;

describe("patients authorisation resolver", () => {
  it("should login as a patient with valid credentials", async (done) => {
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
    expect(result).toEqual(
      expect.objectContaining({
        accountType: "PATIENT",
        email: "patient1@gmail.com",
        fname: "Patient",
        lname: "One",
      })
    );

    done();
  });

  it("should not login as a patient with an invalid password", async (done) => {
    const response = await loginRequest(
      "patient1@gmail.com",
      "Password1234",
      "PATIENT"
    );

    // Throws error due to invalid password
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch(
      "Invalid Login Credentials. Please try again!"
    );

    done();
  });

  it("should not login as a patient with an invalid email (i.e. non-existing account)", async (done) => {
    const response = await loginRequest(
      "invalidpatient@gmail.com",
      "Password1234",
      "PATIENT"
    );

    // Throws error due to invalid password
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch(
      "Invalid Login Credentials. Please try again!"
    );

    done();
  });

  it("should not login as a patient with an incorrect account type but valid credentials", async (done) => {
    const response = await loginRequest(
      "patient1@gmail.com",
      "Password123",
      "DOCTOR"
    );

    // Throws error due to invalid password
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch(
      "Invalid Login Credentials. Please try again!"
    );

    done();
  });

  it("should register a new patient with with valid details and a valid invite token", async (done) => {
    const inviteToken = registerUser(
      "doctor1@nhs.net",
      "newpatientemail@gmail.com",
      "PATIENT"
    );

    const response = await registerRequest(
      {
        fname: "New",
        lname: "Patient",
        password: "Password123",
        passwordConfirmation: "Password123",
      },
      inviteToken
    );

    const {
      body: {
        data: { register },
      },
    } = response;

    expect(register).toBe(true);

    done();
  });

  it("should not register a new patient with valid details and an invalid invite token", async (done) => {
    const inviteToken = registerUser(
      "doctor1@nhs.net",
      "newpatientemail@gmail.com",
      "PATIENT",
      "0s"
    );

    const response = await registerRequest(
      {
        fname: "New",
        lname: "Patient",
        password: "Password123",
        passwordConfirmation: "Password123",
      },
      inviteToken
    );

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("jwt expired");

    done();
  });

  it("should not register a new patient with non-matching password and password confirmations", async (done) => {
    const inviteToken = registerUser(
      "doctor1@nhs.net",
      "newpatientemail@gmail.com",
      "PATIENT"
    );

    const response = await registerRequest(
      {
        fname: "New",
        lname: "Patient",
        password: "Password123",
        passwordConfirmation: "Password1234",
      },
      inviteToken
    );

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch(
      "Password and password confirmation must match!"
    );

    done();
  });

  it("should not register a new patient with a non existing doctor", async (done) => {
    const inviteToken = registerUser(
      "fakedoctor@nhs.net",
      "newpatientemail@gmail.com",
      "PATIENT"
    );

    const response = await registerRequest(
      {
        fname: "New",
        lname: "Patient",
        password: "Password123",
        passwordConfirmation: "Password123",
      },
      inviteToken
    );

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Invalid invitation");

    done();
  });

  it("should not register a new user with an incorrect account type field", async (done) => {
    const inviteToken = registerUser(
      "doctor1@nhs.net",
      "patient1@gmail.com",
      "PATIENTS"
    );

    const response = await registerRequest(
      {
        fname: "New",
        lname: "Patient",
        password: "Password123",
        passwordConfirmation: "Password123",
      },
      inviteToken
    );

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Invalid invitation");

    done();
  });

	it("should not register a new patient if the patient already exists", async (done) => {
    const inviteToken = registerUser(
      "doctor1@nhs.net",
      "patient1@gmail.com",
      "PATIENT"
    );

    const response = await registerRequest(
      {
        fname: "New",
        lname: "Patient",
        password: "Password123",
        passwordConfirmation: "Password123",
      },
      inviteToken
    );

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Account exists!");

    done();
  });

	it("should not register a new patient if the patient already exists but the input email is upper cased", async (done) => {
    const inviteToken = registerUser(
      "doctor1@nhs.net",
      "PATIENT1@gmail.com",
      "PATIENT"
    );

    const response = await registerRequest(
      {
        fname: "New",
        lname: "Patient",
        password: "Password123",
        passwordConfirmation: "Password123",
      },
      inviteToken
    );

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Account exists!");

    done();
  });
});
