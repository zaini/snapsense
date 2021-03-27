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
    const loginRes = await request(app).post("/graphql").send({
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

    const patientOneToken = loginRes.body.data.login.accessToken;

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

    const { body } = response;

    expect(body).toMatchObject(questionnaireObject);

    done();
  });
});

const questionnaireObject = {
  data: {
    getQuestionnaire: [
      { id: "1", text: "In the past 7 days, have you felt unwell?" },
      {
        id: "2",
        text:
          "In the past 7 days, have you had a fever (temperature higher than 36C)?",
      },
      {
        id: "3",
        text: "In the past 7 days, have you seen redness around your ulcer?",
      },
      {
        id: "4",
        text: "In the past 7 days, have you seen any puss around your ulcer?",
      },
      {
        id: "5",
        text:
          "In the past 7 days, has your ulcer been hotter to touch than usual?",
      },
      {
        id: "6",
        text:
          "In the past 7 days, has one foot been hotter to touch than the other?",
      },
      {
        id: "7",
        text:
          "In the past 7 days, have you noticed any unusual smells from the wound?",
      },
      {
        id: "8",
        text: "Please add any other notes for your clinician (optional):",
      },
    ],
  },
};
