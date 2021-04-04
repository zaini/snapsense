require("dotenv").config({ path: "../../../../.env" });
const { verify } = require("jsonwebtoken");

const {
  loginRequest,
  registerUser,
  registerRequest,
} = require("./helper");

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;

describe("doctors authorisation resolver", () => {
  it("should login as a doctor with valid credentials", async (done) => {
    const response = await loginRequest(
      "doctor1@nhs.net",
      "Password123",
      "DOCTOR"
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
        accountType: "DOCTOR",
        email: "doctor1@nhs.net",
        fname: "Doctor",
        lname: "One",
      })
    );

    done();
  });

  it("should not login as a doctor with an invalid password", async (done) => {
    const response = await loginRequest(
      "doctor1@nhs.net",
      "Password1234",
      "DOCTOR"
    );

    // Throws error due to invalid password
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch(
      "Invalid Login Credentials. Please try again!"
    );

    done();
  });

  it("should not login as a doctor with an invalid email (i.e. non-existing account)", async (done) => {
    const response = await loginRequest(
      "invaliddoctor@nhs.net",
      "Password1234",
      "DOCTOR"
    );

    // Throws error due to invalid password
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch(
      "Invalid Login Credentials. Please try again!"
    );

    done();
  });

  it("should not login as a doctor with an incorrect account type but valid credentials", async (done) => {
    const response = await loginRequest(
      "doctor1@nhs.net",
      "Password123",
      "ADMIN"
    );

    // Throws error due to invalid password
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch(
      "Invalid Login Credentials. Please try again!"
    );

    done();
  });

  it("should register a new doctor with with valid details and a valid invite token", async (done) => {
    const inviteToken = registerUser(
      "admin1@gmail.com",
      "newdoctoremail@nhs.net",
      "DOCTOR"
    );

    const response = await registerRequest(
      {
        fname: "New",
        lname: "Doctor",
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

  it("should not register a new doctor with valid details and an invalid invite token", async (done) => {
    const inviteToken = registerUser(
      "admin1@gmail.com",
      "newdoctoremail@nhs.net",
      "DOCTOR",
      "0s"
    );

    const response = await registerRequest(
      {
        fname: "New",
        lname: "Doctor",
        password: "Password123",
        passwordConfirmation: "Password123",
      },
      inviteToken
    );

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("jwt expired");

    done();
  });

  it("should not register a new doctor with non-matching password and password confirmations", async (done) => {
    const inviteToken = registerUser(
      "admin1@gmail.com",
      "newdoctoremail@nhs.net",
      "DOCTOR"
    );

    const response = await registerRequest(
      {
        fname: "New",
        lname: "Doctor",
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

  it("should not register a new doctor with a non existing admin", async (done) => {
    const inviteToken = registerUser(
      "fakeadmin@gmail.com",
      "newdoctoremail@nhs.net",
      "DOCTOR"
    );

    const response = await registerRequest(
      {
        fname: "New",
        lname: "Doctor",
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
      "admin1@gmail.com",
      "doctor1@nhs.net",
      "DOCTORS"
    );

    const response = await registerRequest(
      {
        fname: "New",
        lname: "Doctor",
        password: "Password123",
        passwordConfirmation: "Password123",
      },
      inviteToken
    );

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Invalid invitation");

    done();
  });

	it("should not register a new doctor if the patient already exists", async (done) => {
    const inviteToken = registerUser(
      "admin1@gmail.com",
      "doctor1@nhs.net",
      "DOCTOR"
    );

		const response = await registerRequest(
      {
        fname: "New",
        lname: "Doctor",
        password: "Password123",
        passwordConfirmation: "Password123",
      },
      inviteToken
    );

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Account exists!");

    done();
  });

	it("should not register a new doctor if the doctor already exists but the input email is upper cased", async (done) => {
    const inviteToken = registerUser(
      "admin1@gmail.com",
      "DOCTOR1@nhs.net",
      "DOCTOR"
    );

		const response = await registerRequest(
      {
        fname: "New",
        lname: "Doctor",
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
