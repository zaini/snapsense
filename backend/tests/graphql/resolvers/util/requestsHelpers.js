// File that contains post requests that are re-used frequently to avoid code duplication
const request = require("supertest");

const app = require("../../../../index");

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

const createSubmission = (authToken, answers) => {
  return request(app)
    .post("/graphql")
    .send({
      query: `
			mutation {
				createSubmission(answers: ${answers} images: [])
			}
		`,
    })
    .set("authorization", `Bearer ${authToken}`);
};

const getRequestsAsPatient = (authToken) => {
  return request(app)
    .post("/graphql")
    .send({
      query: `
				query {
					getRequestsAsPatient {
						Doctor {
							email
						}
						Patient {
							email
						}
						Submission {
							id
						}
						deadline
						fulfilled
					}
				}
			`,
    })
    .set("authorization", `Bearer ${authToken}`);
};

const getRequestsAsDoctor = (authToken) => {
  return request(app)
    .post("/graphql")
    .send({
      query: `
				query {
					getRequestsAsDoctor {
						Doctor {
							email
						}
						Patient {
							email
						}
						Submission {
							id
						}
						deadline
						fulfilled
					}
				}
			`,
    })
    .set("authorization", `Bearer ${authToken}`);
};

const getRequestsForReview = (authToken) => {
  return request(app)
    .post("/graphql")
    .send({
      query: `
				query {
					getRequestsForReview {
						Doctor {
							email
						}
						Patient {
							email
						}
						Submission {
							id
						}
						deadline
						fulfilled
					}
				}
			`,
    })
    .set("authorization", `Bearer ${authToken}`);
};

module.exports = {
  getSubmissions,
  getSubmission,
  getSubmissionsForReview,
  flagSubmission,
  createSubmission,
  getRequestsAsPatient,
  getRequestsAsDoctor,
  getRequestsForReview,
};
