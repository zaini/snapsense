const request = require("supertest");

const app = require("../../../index");

let doctorOneToken,
  doctorTwoToken,
  patientOneToken,
  patientTwoToken,
  patientThreeToken;

const getSubmissions = (authToken, patientId) => {
  return request(app)
    .post("/graphql")
    .send({
      query: `
			query {
				getSubmissions${patientId ? `(patient_id: ${patientId})` : ""} {
					flag
					Patient {
						email
					}
					Answers {
						Question {
							text
						}
						value
					}
					Images {
						url
					}
				}
			}		
		`,
    })
    .set("authorization", `Bearer ${authToken}`);
};

describe("submissions resolvers", () => {
  beforeAll(async (done) => {
    const {
      doctorOne,
      doctorTwo,
      patientOne,
      patientTwo,
      patientThree,
    } = await require("./util/authTokens");
    doctorOneToken = doctorOne;
    doctorTwoToken = doctorTwo;
    patientOneToken = patientOne;
    patientTwoToken = patientTwo;
    patientThreeToken = patientThree;

    done();
  });

  it("should get submissions as a logged in patient with reviewed submissions", async (done) => {
    const response = await getSubmissions(patientOneToken);
    const { body } = response;
    expect(body).toMatchObject(patientOneSubmissions);
    done();
  });

  it("should get submissions as a logged in patient with unreviewed submissions", async (done) => {
    const response = await getSubmissions(patientTwoToken);
    const { body } = response;
    expect(body).toMatchObject(patientTwoSubmissions);
    done();
  });

  it("should throw error if logged out user tries to retrieve all submissions", async (done) => {
    const response = await getSubmissions();
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Invalid Login Token");
    done();
  });

  it("should return empty array of submissions if logged in patient has no submissions and tries to retrieve them", async (done) => {
    const response = await getSubmissions(patientThreeToken);
    const { body } = response;
    expect(body).toMatchObject({
      data: {
        getSubmissions: [
          {
            Answers: [],
            Images: [],
            Patient: {
              email: "ben.parker@marvel.com",
            },
            flag: null,
          },
        ],
      },
    });
    done();
  });
});

const patientOneSubmissions = {
  data: {
    getSubmissions: [
      {
        flag: 1,
        Patient: { email: "patient1@gmail.com" },
        Answers: [
          {
            Question: { text: "In the past 7 days, have you felt unwell?" },
            value: true,
          },
          {
            Question: {
              text:
                "In the past 7 days, have you had a fever (temperature higher than 36C)?",
            },
            value: true,
          },
          {
            Question: {
              text:
                "In the past 7 days, have you seen redness around your ulcer?",
            },
            value: false,
          },
          {
            Question: {
              text:
                "In the past 7 days, have you seen any puss around your ulcer?",
            },
            value: false,
          },
          {
            Question: {
              text:
                "In the past 7 days, has your ulcer been hotter to touch than usual?",
            },
            value: true,
          },
          {
            Question: {
              text:
                "In the past 7 days, has one foot been hotter to touch than the other?",
            },
            value: true,
          },
          {
            Question: {
              text:
                "In the past 7 days, have you noticed any unusual smells from the wound?",
            },
            value: true,
          },

          {
            Question: {
              text: "Please add any other notes for your clinician (optional):",
            },
            value: true,
          },
        ],
        Images: [
          {
            url:
              "https://snapsensebucket.s3.ap-south-1.amazonaws.com/f150d94e-25cb-4973-bf26-d987b5bde188.jpg",
          },
        ],
      },
    ],
  },
};

const patientTwoSubmissions = {
  data: {
    getSubmissions: [
      {
        flag: null,
        Patient: { email: "patient2@gmail.com" },
        Answers: [],
        Images: [
          {
            url:
              "https://snapsensebucket.s3.ap-south-1.amazonaws.com/f150d94e-25cb-4973-bf26-d987b5bde188.jpg",
          },
        ],
      },
    ],
  },
};
