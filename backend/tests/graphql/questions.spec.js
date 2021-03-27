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
});
