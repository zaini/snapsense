const request = require("supertest");

const app = require("../../../index");

let superAdminToken, adminToken;

describe("feedback resolvers", () => {
  beforeAll(async (done) => {
    const { superAdmin, admin } = await require("./util/authTokens");
    superAdminToken = superAdmin;
    adminToken = admin;

    done();
  });

  it("should get all feedback as super admin", async (done) => {
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

  it("should not get all feedback if not logged in", async (done) => {
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

  it("should not get all feedback if not logged in as a super admin", async (done) => {
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

  it("should get specific feedback as super admin", async (done) => {
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

  it("should throw an error when trying to get a specific feedback that does not exist", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					query {
						getSpecificFeedback(feedback_id: "100") {
							stars
							extra
						}
					}						
				`,
      })
      .set("authorization", `Bearer ${superAdminToken}`);

    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Feedback does not exist!");

    done();
  });

  it("should not get specific feedback if not logged in", async (done) => {
    const response = await request(app).post("/graphql").send({
      query: `
					query {
						getSpecificFeedback(feedback_id: "1") {
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

  it("should not get specific feedback if not logged in as a super admin", async (done) => {
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
      .set("authorization", `Bearer ${adminToken}`);

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Invalid user account type!");
    done();
  });

  it("should create feedback if logged in", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					mutation {
						createFeedback(stars: 1 extra:"Great web app! Love the features!") {
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
        createFeedback: {
          stars: 1,
          extra: "Great web app! Love the features!",
        },
      },
    });

    done();
  });

  it("should create feedback if not logged in", async (done) => {
    const response = await request(app).post("/graphql").send({
      query: `
					mutation {
						createFeedback(stars: 1 extra:"Great web app! Love the features!") {
							stars
							extra
						}
					}						
				`,
    });

    const { body } = response;

    expect(body).toMatchObject({
      data: {
        createFeedback: {
          stars: 1,
          extra: "Great web app! Love the features!",
        },
      },
    });

    done();
  });

  it("should create feedback if extra information is empty", async (done) => {
    const response = await request(app).post("/graphql").send({
      query: `
					mutation {
						createFeedback(stars: 4) {
							stars
							extra
						}
					}						
				`,
    });

    const { body } = response;

    expect(body).toMatchObject({
      data: {
        createFeedback: {
          stars: 4,
          extra: null,
        },
      },
    });

    done();
  });
});
