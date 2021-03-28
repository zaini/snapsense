const request = require("supertest");

const app = require("../../index");

let superAdminToken;
let adminToken;

describe("hospitals resolvers", () => {
  beforeAll(async (done) => {
    // Login and get the access tokens for various users needed in this test suite
    superAdminToken = await request(app).post("/graphql").send({
      query: `
				mutation {
					login(
						email: "snapsense@gmail.com"
						password: "Password123"
						account_type: "SUPERADMIN"
					)	
					{
						accessToken
					}
				}
			`,
    });

    superAdminToken = superAdminToken.body.data.login.accessToken;

    adminToken = await request(app).post("/graphql").send({
      query: `
				mutation {
					login(
						email: "admin1@gmail.com"
						password: "Password123"
						account_type: "ADMIN"
					)	
					{
						accessToken
					}
				}
			`,
    });

    adminToken = adminToken.body.data.login.accessToken;

    done();
  });

  test("should get all hospitals as super-admin", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					query {
						getHospitals {
							id
							name
							contact_email
						}
					}
			`,
      })
      .set("authorization", `Bearer ${superAdminToken}`);

    const { body } = response;

    expect(body).toMatchObject({
      data: {
        getHospitals: [
          {
            id: "1",
            name: "London Hospital",
            contact_email: "london.hospital@mail.com",
          },
          {
            id: "2",
            name: "London Hospital 2",
            contact_email: "london.hospital.two@mail.com",
          },
          {
            id: "3",
            name: "London Hospital 3",
            contact_email: "london.hospital.three@mail.com",
          },
        ],
      },
    });
    done();
  });

  test("should not get all hospitals if not logged in", async (done) => {
    const response = await request(app).post("/graphql").send({
      query: `
					query {
						getHospitals {
							id
							name
							contact_email
						}
					}
			`,
    });

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Missing Authorization Header");
    done();
  });

  test("should not get all hospitals if logged in as a user that's not a super admin", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					query {
						getHospitals {
							id
							name
							contact_email
						}
					}
			`,
      })
      .set("authorization", `Bearer ${adminToken}`);

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Invalid user account type!");
    done();
  });
});
