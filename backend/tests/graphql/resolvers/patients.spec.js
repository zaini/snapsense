const request = require("supertest");

const app = require("../../../index");

// Access tokens for various users that are needed
let doctorOneToken, patientOneToken, patientTwoToken;

describe("patients resolvers", () => {
  beforeAll(async (done) => {
  	const {
      doctorOne,
      patientOne,
      patientTwo
    } = await require("./util/authTokens");

		doctorOneToken = doctorOne;
		patientOneToken = patientOne;
		patientTwoToken = patientTwo;

		done()
  });

  test("should get a patient as a doctor where the patient belongs to the doctor", async (done) => {
    // Get the patients belonging to the logged in doctor
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					query {
						getPatientAsDoctor(patient_id: "1") {
							id
							fname
							lname
							email
						}
					}
				`,
      })
      .set("authorization", `Bearer ${doctorOneToken}`);

    const { body } = response;

    expect(body).toMatchObject({
      data: {
        getPatientAsDoctor: {
          id: "1",
          fname: "Patient",
          lname: "One",
          email: "patient1@gmail.com",
        },
      },
    });
    done();
  });

  test("should not get a patient as a doctor where the patient does not belongs to the doctor", async (done) => {
    // Try to get a patient that does not belong to the logged in doctor
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					query {
						getPatientAsDoctor(patient_id: "2") {
							id
							fname
							lname
							email
						}
					}
				`,
      })
      .set("authorization", `Bearer ${doctorOneToken}`);

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Invalid patient!");
    done();
  });

  test("should not get a patient as a doctor where the patient does not exist", async (done) => {
    // Look for patient_id 100, as an id of 100 does not exist in the test fixtures
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					query {
						getPatientAsDoctor(patient_id: "100") {
							id
							fname
							lname
							email
						}
					}
				`,
      })
      .set("authorization", `Bearer ${doctorOneToken}`);

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Invalid patient!");
    done();
  });

  test("should not get a patient as a doctor without authorization header", async (done) => {
    // Do not attach an authorization header
    const response = await request(app).post("/graphql").send({
      query: `
				query {
					getPatientAsDoctor(patient_id: "100") {
						id
						fname
						lname
						email
					}
				}
			`,
    });

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Missing Authorization Header");
    done();
  });

  test("should get patients as a doctor where doctor is valid", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					query {
						getPatientsAsDoctor {
							id
							fname
							lname
							email
						}
					}
				`,
      })
      .set("authorization", `Bearer ${doctorOneToken}`);

    const { body } = response;

    expect(body).toMatchObject({
      data: {
        getPatientsAsDoctor: [
          {
            id: "1",
            fname: "Patient",
            lname: "One",
            email: "patient1@gmail.com",
          },
        ],
      },
    });

    done();
  });

  test("should not get patients as a doctor without authorization header", async (done) => {
    const response = await request(app).post("/graphql").send({
      query: `
				query {
					getPatientsAsDoctor {
						id
						fname
						lname
						email
					}
				}
			`,
    });

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Missing Authorization Header");
    done();
  });

  test("should add a valid patient to a new valid doctor", async (done) => {
    // Add a patient to a new doctor
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					mutation {
						addPatientToDoctor(
							patient_email: "patient2@gmail.com"
							doctor_email: "doctor1@nhs.net"
						)
					}
				`,
      })
      .set("authorization", `Bearer ${patientTwoToken}`);

    const {
      data: { addPatientToDoctor: result },
    } = response.body;

    // Make sure the result was successful
    expect(result).toBe(true);

    // Make sure the doctor now has this new association with the patient
    const getPatientsAsDoctor = await request(app)
      .post("/graphql")
      .send({
        query: `
					query {
						getPatientsAsDoctor {
							id
							fname
							lname
							email
						}
					}
				`,
      })
      .set("authorization", `Bearer ${doctorOneToken}`);

    const { body } = getPatientsAsDoctor;

    expect(body).toMatchObject({
      data: {
        getPatientsAsDoctor: [
          {
            id: "1",
            fname: "Patient",
            lname: "One",
            email: "patient1@gmail.com",
          },
          {
            id: "2",
            fname: "Patient",
            lname: "Two",
            email: "patient2@gmail.com",
          },
        ],
      },
    });

    done();
  });

  test("should not add new doctor patient relationship if it exists already", async (done) => {
    // Add a patient to an existing doctor where there is already a relationship between the doctor and patient
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					mutation {
						addPatientToDoctor(
							patient_email: "patient1@gmail.com"
							doctor_email: "doctor1@nhs.net"
						)
					}
				`,
      })
      .set("authorization", `Bearer ${patientOneToken}`);

    const {
      data: { addPatientToDoctor: result },
    } = response.body;

    // Make sure the result was successful
    expect(result).toBe(true);

    // Make sure the doctor has the patient association only once (meaning it was not duplicated)
    const getPatientsAsDoctor = await request(app)
      .post("/graphql")
      .send({
        query: `
					query {
						getPatientsAsDoctor {
							id
							fname
							lname
							email
						}
					}
				`,
      })
      .set("authorization", `Bearer ${doctorOneToken}`);

    const { body } = getPatientsAsDoctor;

    expect(body).toMatchObject({
      data: {
        getPatientsAsDoctor: [
          {
            id: "1",
            fname: "Patient",
            lname: "One",
            email: "patient1@gmail.com",
          },
        ],
      },
    });

    done();
  });

  test("should not add a doctor patient relationship if the patient_email does not match the logged in user email", async (done) => {
    // Add a patient to an existing doctor where there is already a relationship between the doctor and patient
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					mutation {
						addPatientToDoctor(
							patient_email: "patient1@gmail.com"
							doctor_email: "doctor1@nhs.net"
						)
					}
				`,
      })
      .set("authorization", `Bearer ${patientTwoToken}`);

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch(
      "You are not logged into the correct account for this invite."
    );
    done();
  });
});
