const request = require("supertest");

const app = require("../../index");

describe("questions resolvers", () => {
  test("should not get questionnaire if not logged in", async (done) => {
    const response = await request(app).post("/graphql").send({
      query: `
				query {
					getQuestionnaire {
					id
					text
					}
				}
	  	`,
    });

    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Missing Authorization Header");
    done();
  });

  test("should get questionnaire if logged in", async (done) => {
    // Login
    const patientOneToken = await request(app).post("/graphql").send({
      query: `
				mutation {
					login(
						email: "patient1@gmail.com"
						password: "Password123"
						account_type: "PATIENT"
					)	
					{
						accessToken
					}
				}
			`,
    });

    patientOneToken = patientOneToken.body.data.login.accessToken;

    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					query {
						getQuestionnaire {
						id
						text
						}
					}
				`,
      })
      .set("authorization", `Bearer ${patientOneToken}`);

    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Missing Authorization Header");
    done();
  });
});
