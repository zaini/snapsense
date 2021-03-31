const request = require("supertest");

const app = require("../../index");

let superAdminToken, adminToken, patientOneToken;

describe("doctors resolvers", () => {
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
    const response = await request(app)
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
            lname: "One",
            email: "doctor1@nhs.net",
          },
        ],
      },
    });
    done();
  });
});
