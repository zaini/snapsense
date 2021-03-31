const request = require("supertest");

const app = require("../../index");

let superAdminToken, adminToken;

describe("feedback resolvers", () => {
  beforeAll(async (done) => {
    const { superAdmin, admin } = await require("./util/authTokens");
    superAdminToken = superAdmin;
    adminToken = admin;

    done();
  });

  test("should get all feedback as super admin", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					query {
						getFeedback {
							stars
							extra
						}
					}		
				`,
      })
      .set("authorization", `Bearer ${superAdminToken}`);

    const { body } = response;

    expect(body).toMatchObject({
      data: {
        getFeedback: [
          { stars: 5, extra: "I love SnapSense so much!" },
          { stars: 5, extra: "My foot doesn't hurt anymore" },
          { stars: 0, extra: null },
          { stars: 4, extra: "They have a very nice website!!!" },
        ],
      },
    });

    done();
  });

	test("should not get all feedback if not logged in", async (done) => {
    const response = await request(app).post("/graphql").send({
      query: `
				query {
					getFeedback {
						stars
						extra
					}
				}			
			`,
    });

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Missing Authorization Header");
    done();
  });

  test("should not get all feedback if not logged in as a super admin", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					query {
						getFeedback {
							stars
							extra
						}
					}			
				`,
      })
      .set("authorization", `Bearer ${adminToken}`);

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Invalid user account type!");
    done();
  });
  
	test("should get specific feedback as super admin", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					query {
						getSpecificFeedback(feedback_id: "1") {
							stars
							extra
						}
					}						
				`,
      })
      .set("authorization", `Bearer ${superAdminToken}`);

    const { body } = response;

    expect(body).toMatchObject({
      data: {
        getSpecificFeedback: { stars: 5, extra: "I love SnapSense so much!" },
      },
    });

    done();
  });

});
