const request = require("supertest");

const app = require("../../../index");
const {
  getSubmission,
  getSubmissions,
  getSubmissionsForReview,
  flagSubmission,
  createSubmission,
} = require("./util/requestsHelpers");
const {
  patientOneSubmissions,
  patientTwoSubmissions,
} = require("./util/submissionsData");

let superAdminToken,
  adminToken,
  doctorOneToken,
  doctorTwoToken,
  patientOneToken,
  patientTwoToken,
  patientThreeToken;

// The below does not work, credit from https://github.com/nestjs/graphql/issues/1057
// const createSubmission = (authToken) => {
//   const fixturePath = path.join(__dirname, "../../fixtures/image.png");

//   const query = `
// 			mutation($images: [Upload!]) {
// 				createSubmission(images: $images)
// 			}
// 	`;
//   return request(app)
//     .post("/graphql")
//     .set("authorization", `Bearer ${authToken}`)
//     .set("Content-Type", "multipart/form-data")
//     .field(
//       "operations",
//       JSON.stringify({
//         query,
//         variables: {
//           images: null,
//         },
//       })
//     )
//     .field(
//       "map",
//       JSON.stringify({
//         images: ["variables.images"],
//       })
//     )
//     .attach("images", [fixturePath]);
// };

describe("submissions resolvers", () => {
  beforeAll(async (done) => {
    const {
      superAdmin,
      admin,
      doctorOne,
      doctorTwo,
      patientOne,
      patientTwo,
      patientThree,
    } = await require("./util/authTokens");

    superAdminToken = superAdmin;
    adminToken = admin;
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

  it("should get all submissions of patients assigned to a doctor #1", async (done) => {
    const response = await getSubmissions(doctorOneToken);
    const { body } = response;
    expect(body).toMatchObject(patientOneSubmissions); // patientOne is the only patient assigned to doctorOne
    done();
  });

  it("should get all submissions of patients assigned to a doctor #2", async (done) => {
    const response = await getSubmissions(doctorTwoToken);
    const { body } = response;
    expect(body).toMatchObject(patientTwoSubmissions); // patientTwo is the only patient assigned to doctorTwo
    done();
  });

  it("should get submissions of a specific patient assigned to a doctor #1", async (done) => {
    const response = await getSubmissions(doctorOneToken, 1);
    const { body } = response;
    expect(body).toMatchObject(patientOneSubmissions);
    done();
  });

  it("should get submissions of a specific patient assigned to a doctor #2", async (done) => {
    const response = await getSubmissions(doctorTwoToken, 2);
    const { body } = response;
    expect(body).toMatchObject(patientTwoSubmissions);
    done();
  });

  it("should not get submissions of a specific patient that is not assigned to a doctor", async (done) => {
    const response = await getSubmissions(doctorTwoToken, 1);
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("This patient does not belong to you.");
    done();
  });

  it("should not get submissions if logged in user as an admin", async (done) => {
    const response = await getSubmissions(adminToken);
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Invalid user type");
    done();
  });

  it("should not get submissions if logged in user as a super-admin", async (done) => {
    const response = await getSubmissions(superAdminToken);
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Invalid user type");
    done();
  });

  it("should get specific submission if the logged in patient owns the submission", async (done) => {
    const response = await getSubmission(patientOneToken, 1);
    const {
      body: {
        data: { getSubmission: result },
      },
    } = response;
    expect(result).toMatchObject(patientOneSubmissions.data.getSubmissions[0]);
    done();
  });

  it("should not get specific submission if the logged in patient does not own the submission", async (done) => {
    const response = await getSubmission(patientOneToken, 2);
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("This submission does not exist!");
    done();
  });

  it("should not get specific submission if the submission does not exist", async (done) => {
    const response = await getSubmission(patientOneToken, 200);
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("This submission does not exist.");
    done();
  });

  it("should not get specific submission if not logged in", async (done) => {
    const response = await getSubmission("invalidlogintoken", 200);
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Invalid Login Token");
    done();
  });

  it("should get specific submission as a doctor if the submission belongs to a patient the doctor owns", async (done) => {
    const response = await getSubmission(doctorOneToken, 1);
    const {
      body: {
        data: { getSubmission: result },
      },
    } = response;
    expect(result).toMatchObject(patientOneSubmissions.data.getSubmissions[0]);
    done();
  });

  it("should not get specific submission as a doctor if the submission belongs to a patient the doctor does not own", async (done) => {
    const response = await getSubmission(doctorTwoToken, 1);
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("This submission does not exist!!");
    done();
  });

  it("should not get specific submission as a doctor if the submission does not exist", async (done) => {
    const response = await getSubmission(doctorTwoToken, 100);
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("This submission does not exist.");
    done();
  });

  it("should not get specific submission if logged in user as an admin", async (done) => {
    const response = await getSubmission(adminToken, 1);
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch(
      "You are not logged into the correct account to access this submission."
    );
    done();
  });

  it("should not get specific submission if logged in user as a super-admin", async (done) => {
    const response = await getSubmission(superAdminToken, 1);
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch(
      "You are not logged into the correct account to access this submission."
    );
    done();
  });

  it("should get submissions for review as a doctor", async (done) => {
    const response = await getSubmissionsForReview(doctorTwoToken);
    const {
      body: {
        data: { getSubmissionsForReview: result },
      },
    } = response;
    expect(result).toMatchObject(patientTwoSubmissions.data.getSubmissions);
    done();
  });

  it("should return an empty array if the logged in doctor has no requests to review", async (done) => {
    const response = await getSubmissionsForReview(doctorOneToken);
    const {
      body: {
        data: { getSubmissionsForReview: result },
      },
    } = response;
    expect(result).toEqual([]);
    done();
  });

  it("should throw error if a patient tries to get submissions for review", async (done) => {
    const response = await getSubmissionsForReview(patientOneToken);
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch(
      "You are not logged into the correct account for this feature."
    );
    done();
  });

  it("should throw error if an admin tries to get submissions for review", async (done) => {
    const response = await getSubmissionsForReview(adminToken);
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch(
      "You are not logged into the correct account for this feature."
    );
    done();
  });

  it("should throw error if a super admin tries to get submissions for review", async (done) => {
    const response = await getSubmissionsForReview(superAdminToken);
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch(
      "You are not logged into the correct account for this feature."
    );
    done();
  });

  it("should flag submission as a doctor if the submission belongs to a patient the doctor owns", async (done) => {
    const response = await flagSubmission(doctorTwoToken, 2, 1);
    const { body } = response;
    expect(body).toMatchObject({
      data: {
        flagSubmission: {
          flag: 1,
          Patient: { email: "patient2@gmail.com" },
          Answers: [],
          Images: [
            {
              url:
                "https://snapsensebucket.s3.ap-south-1.amazonaws.com/f150d94e-25cb-4973-bf26-d987b5bde188.jpg",
            },
          ],
        },
      },
    });
    done();
  });

  it("should not flag submission as a doctor if the flag is greater than 3", async (done) => {
    const response = await flagSubmission(doctorTwoToken, 2, 4);
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Invalid flag value. Must be 1-3 (inclusive)");
    done();
  });

  it("should not flag submission as a doctor if the flag is less than 1", async (done) => {
    const response = await flagSubmission(doctorTwoToken, 2, 0);
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Invalid flag value. Must be 1-3 (inclusive)");
    done();
  });

  it("should flag submission as a doctor if the flag is 3", async (done) => {
    const response = await flagSubmission(doctorTwoToken, 2, 3);
    const {
      body: {
        data: {
          flagSubmission: { flag },
        },
      },
    } = response;
    expect(flag).toBe(3);
    done();
  });

  it("should flag submission as a doctor if the flag is 1", async (done) => {
    const response = await flagSubmission(doctorTwoToken, 2, 1);
    const {
      body: {
        data: {
          flagSubmission: { flag },
        },
      },
    } = response;
    expect(flag).toBe(1);
    done();
  });

  it("should not flag submission as a doctor if the submission belongs to a patient the doctor does not own", async (done) => {
    const response = await flagSubmission(doctorOneToken, 2, 1);
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("You cannot flag this submission");
    done();
  });

  it("should not flag submission a non-existing submission", async (done) => {
    const response = await flagSubmission(doctorOneToken, 200, 1);
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("This submission does not exist.");
    done();
  });

  it("should not flag submission as a patient", async (done) => {
    const response = await flagSubmission(patientOneToken, 1, 1);
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Invalid account type!");
    done();
  });

  it("should not flag submission as an admin", async (done) => {
    const response = await flagSubmission(adminToken, 1, 1);
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Invalid account type!");
    done();
  });

  it("should not flag submission as a super-admin", async (done) => {
    const response = await flagSubmission(superAdminToken, 1, 1);
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Invalid account type!");
    done();
  });

  it("should create submission as a patient", async (done) => {
    const answers = JSON.stringify(questionnaireObject);

    const response = await createSubmission(
      patientOneToken,
      JSON.stringify(answers)
    );

    const {
      body: {
        data: { createSubmission: result },
      },
    } = response;

    expect(result).toBe(true);
    done();
  });

  it("should not create a submission as a patient if a question is missing", async (done) => {
    const newQuestionnaire = questionnaireObject;
    delete newQuestionnaire.questionnaire[1];
    const answers = JSON.stringify(newQuestionnaire);

    const response = await createSubmission(
      patientOneToken,
      JSON.stringify(answers)
    );

		const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Please answer all questions");
    done();
  });

	it("should not create a submission as a patient if a question answer is missing", async (done) => {
    const newQuestionnaire = questionnaireObject;
    newQuestionnaire.questionnaire[2].val = undefined;
    const answers = JSON.stringify(newQuestionnaire);

    const response = await createSubmission(
      patientOneToken,
      JSON.stringify(answers)
    );

		const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Please answer all questions");
    done();
  });

  it("should not create submission as a doctor", async (done) => {
    const answers = JSON.stringify(questionnaireObject);

    const response = await createSubmission(
      doctorOneToken,
      JSON.stringify(answers)
    );

    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Invalid account type!");
    done();
  });

  it("should not create submission as an admin", async (done) => {
    const answers = JSON.stringify(questionnaireObject);

    const response = await createSubmission(
      adminToken,
      JSON.stringify(answers)
    );

    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Invalid account type!");
    done();
  });

  it("should not create submission as a super-admin", async (done) => {
    const answers = JSON.stringify(questionnaireObject);

    const response = await createSubmission(
      superAdminToken,
      JSON.stringify(answers)
    );

    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Invalid account type!");
    done();
  });
});

const questionnaireObject = {
  questionnaire: {
    1: {
      val: "1",
    },
    2: {
      val: "0",
    },
    3: {
      val: "1",
      extra: "I don't feel good",
    },
    4: {
      val: "1",
    },
    5: {
      val: "0",
      extra: "Not really",
    },
    6: {
      val: "1",
      extra: "I feel sick",
    },
    7: {
      val: "0",
    },
    8: {
      val: "1",
      extra: "How long will my pain last?",
    },
  },
};
