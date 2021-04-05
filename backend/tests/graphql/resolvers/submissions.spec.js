const request = require("supertest");

const app = require("../../../index");

let superAdminToken,
  adminToken,
  doctorOneToken,
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

const getSubmission = (authToken, submissionsId) => {
  return request(app)
    .post("/graphql")
    .send({
      query: `
				query {
					getSubmission(submission_id: ${submissionsId}) {
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

const getSubmissionsForReview = (authToken) => {
  return request(app)
    .post("/graphql")
    .send({
      query: `
				query {
					getSubmissionsForReview {
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

const flagSubmission = (authToken, submissionId, flag) => {
  return request(app)
    .post("/graphql")
    .send({
      query: `
				mutation {
					flagSubmission(submission_id: ${submissionId}, flag: ${flag}) {
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
