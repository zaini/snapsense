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
});
