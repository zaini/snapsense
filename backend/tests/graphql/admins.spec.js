const request = require("supertest");

const app = require("../../index");

let superAdminToken;

describe("admins resolvers", () => {
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
		
    done();
  });

  test("should create admin as a super-admin", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					mutation {
						createAdmin(
							fname: "Jerry"
							lname: "Seinfeld"
							email: "bob@sacamano.com"
							password: "Password123"
							hospital_id: 1
						) {
							id
							fname
							lname
							email
							Hospital {
								id
							}
						}
					}						
				`,
      })
      .set("authorization", `Bearer ${superAdminToken}`);

    const { body } = response;

    expect(body).toMatchObject({
      data: {
        createAdmin: {
          id: "3",
          fname: "Jerry",
          lname: "Seinfeld",
          email: "bob@sacamano.com",
          Hospital: { id: "1" },
        },
      },
    });

    done();
  });

  test("should should not create admin if not logged in as a super-admin", async (done) => {
    const response = await request(app).post("/graphql").send({
      query: `
					mutation {
						createAdmin(
							fname: "Jerry"
							lname: "Seinfeld"
							email: "bob@sacamano.com"
							password: "Password123"
							hospital_id: 1
						) {
							id
							fname
							lname
							email
							Hospital {
								id
							}
						}
					}						
				`,
    });

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Missing Authorization Header");
    done();
  });
});
