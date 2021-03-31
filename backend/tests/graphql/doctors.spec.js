const request = require("supertest");

const app = require("../../index");

let superAdminToken, adminToken, patientOneToken;

describe("hospitals resolvers", () => {
  beforeAll(async (done) => {
    const {
      superAdmin,
      admin,
      patientOne,
    } = await require("./util/authTokens");

    superAdminToken = superAdmin;
    adminToken = admin;
    patientOneToken = patientOne;

    done();
  });

  test("should get all doctors as super admin", async (done) => {
    const response = request(app)
      .post("/graphql")
      .send({
        query: `
				query {
					getDoctorsAsAdmin {
						fname
						lname
						email
					}
				}			
			`,
      })
      .set("authorization", `Bearer ${adminToken}`);

    const { body } = response;

    expect(body).toMatchObject({
      data: {
        getDoctorsAsAdmin: [
          {
            fname: "Doctor",
            lname: "Two",
            email: "doctor2@nhs.net",
          },
          {
            fname: "Doctor",
            lname: "Two",
            email: "doctor2@nhs.net",
            password: "Password123",
          },
          { fname: "Jarvis", lname: "Smith", email: "jarvis.smith@nhs.net" },
        ],
      },
    });
    done();
  });
});
