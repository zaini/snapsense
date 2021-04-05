require("dotenv").config({ path: "../../../../.env" });

const request = require("supertest");
const { verify } = require("jsonwebtoken");

const app = require("../../../index");
const { inviteToken } = require("./util/inviteTokens");

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;

// Access tokens for various users that are needed
let adminToken, doctorOneToken, patientOneToken, patientTwoToken;

const checkInvitation = (token) => {
  return request(app)
    .post("/graphql")
    .send({
      query: `
				query {
					checkInvitation(invitationToken: "${token}")
				}		
			`,
    });
};

const inviteUser = (email, authToken) => {
  return request(app)
    .post("/graphql")
    .send({
      query: `
				mutation {
					inviteUser(email: "${email}")
				}		
			`,
    })
    .set("authorization", `Bearer ${authToken}`);
};

describe("invite links resolvers", () => {
  beforeAll(async (done) => {
    const {
			admin,
      doctorOne,
      patientOne,
      patientTwo,
    } = await require("./util/authTokens");

		adminToken = admin;
    doctorOneToken = doctorOne;
    patientOneToken = patientOne;
    patientTwoToken = patientTwo;

    done();
  });

	it("should return correct token if checkInvitation is called with a valid invite for a patient", async (done) => {
    const token = inviteToken(
      "doctor1@nhs.net",
      "newpatient@gmail.com",
      "PATIENT",
      false
    );

    const response = await checkInvitation(token);

    const {
      data: { checkInvitation: result },
    } = response.body;

    const decodedResponse = verify(result, ACCESS_TOKEN_SECRET_KEY);

    // Make sure the decoded response contains the correct data, cannot check for full object equality due to timestamps
    expect(decodedResponse).toEqual(
      expect.objectContaining({
        accountExists: false,
        accountType: "PATIENT",
        inviterEmail: "doctor1@nhs.net",
        newAccountEmail: "newpatient@gmail.com",
      })
    );

    done();
  });

  it("should correctly update accountExists field in the invitation token if patient exists", async (done) => {
    const token = inviteToken(
      "doctor1@nhs.net",
      "patient2@gmail.com",
      "PATIENT",
      false
    );

    const response = await checkInvitation(token);

    const {
      data: { checkInvitation: result },
    } = response.body;

    const decodedResponse = verify(result, ACCESS_TOKEN_SECRET_KEY);

    // Make sure the decoded response contains the correct data, cannot check for full object equality due to timestamps
    expect(decodedResponse).toEqual(
      expect.objectContaining({
        accountExists: true, // accountExists should be set to true because "patient2@gmail.com" is an existing account
        accountType: "PATIENT",
        inviterEmail: "doctor1@nhs.net",
        newAccountEmail: "patient2@gmail.com",
      })
    );

    done();
  });

  it("should throw an error if checkInvitation is called with an invalid invite due to a deleted doctor", async (done) => {
    const token = inviteToken(
      "doctor10@nhs.net",
      "newpatient@gmail.com",
      "PATIENT",
      false
    );

    const response = await checkInvitation(token);

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Inviter no longer exists!");

    done();
  });

  it("should throw an error if checkInvitation is called with an invite where the doctor and patient are already linked", async (done) => {
    const token = inviteToken(
      "doctor1@nhs.net",
      "patient1@gmail.com",
      "PATIENT",
      true
    );

    const response = await checkInvitation(token);

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch(
      "You are already registered with this doctor!"
    );

    done();
  });

  it("should return correct token if checkInvitation is called with a valid invite for a doctor", async (done) => {
    const token = inviteToken(
      "admin1@gmail.com",
      "newdoctor@nhs.net",
      "DOCTOR",
      false
    );

    const response = await checkInvitation(token);

    const {
      data: { checkInvitation: result },
    } = response.body;

    const decodedResponse = verify(result, ACCESS_TOKEN_SECRET_KEY);

    // Make sure the decoded response contains the correct data, cannot check for full object equality due to timestamps
    expect(decodedResponse).toEqual(
      expect.objectContaining({
        accountExists: false,
        accountType: "DOCTOR",
        inviterEmail: "admin1@gmail.com",
        newAccountEmail: "newdoctor@nhs.net",
      })
    );

    done();
  });

  it("should throw an error if checkInvitation is called with an invalid invite due to a deleted admin", async (done) => {
    const token = inviteToken(
      "admin10@gmail.com",
      "newdoctor@nhs.net",
      "DOCTOR",
      false
    );

    const response = await checkInvitation(token);

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Inviter no longer exists!");

    done();
  });

  it("should throw an error if checkInvitation is called with an invalid invite due to the doctor being already signed up", async (done) => {
    const token = inviteToken(
      "admin1@gmail.com",
      "doctor2@nhs.net",
      "DOCTOR",
      false
    );

    const response = await checkInvitation(token);

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("You already have an account!");

    done();
  });

  it("should throw an error if checkInvitation is called with an invalid account type", async (done) => {
    const token = inviteToken(
      "admin1@gmail.com",
      "doctor2@nhs.net",
      "DOCTORS",
      false
    );

    const response = await checkInvitation(token);

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Invalid Account Type!");

    done();
  });

  it("should return invite token with emails lower cased if invite token is valid but contains upper-cased emails", async (done) => {
    const token = inviteToken(
      "AdMIN1@GMAIL.COM",
      "NeWDOcTOR@nHs.NEt",
      "DOCTOR",
      false
    );

    const response = await checkInvitation(token);

    const {
      data: { checkInvitation: result },
    } = response.body;

    const decodedResponse = verify(result, ACCESS_TOKEN_SECRET_KEY);

    // Make sure the decoded response contains the correct data with lower-cased emails
    // Cannot check for full object equality due to timestamps
    expect(decodedResponse).toEqual(
      expect.objectContaining({
        accountExists: false,
        accountType: "DOCTOR",
        inviterEmail: "admin1@gmail.com",
        newAccountEmail: "newdoctor@nhs.net",
      })
    );

    done();
  });
});
