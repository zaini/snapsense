const request = require("supertest");

const app = require("../../index");

// Access tokens for various users that are needed
let doctorOneToken;
let patientOneToken;
let patientTwoToken;

describe("patient resolvers", () => {
  beforeAll(async (done) => {
		// Login and get the access tokens for various users needed in this test suite
    doctorOneToken = await request(app).post("/graphql").send({
      query: `
				mutation {
					login(
						email: "doctor1@nhs.net"
						password: "Password123"
						account_type: "DOCTOR"
					)	
					{
						accessToken
					}
				}
			`,
    });

		doctorOneToken = doctorOneToken.body.data.login.accessToken;

    patientOneToken = await request(app).post("/graphql").send({
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

    patientTwoToken = await request(app).post("/graphql").send({
      query: `
				mutation {
					login(
						email: "patient2@gmail.com"
						password: "Password123"
						account_type: "PATIENT"
					)	
					{
						accessToken
					}
				}
			`,
    });

    patientTwoToken = patientTwoToken.body.data.login.accessToken;
    done();
  });

  test("get a patient as a doctor where the patient belongs to the doctor", async (done) => {
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

  test("get a patient as a doctor where the patient does not belongs to the doctor", async (done) => {
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

  test("get a patient as a doctor where the patient does not exist", async (done) => {
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

  test("get patient as a doctor without authorization header should throw error", async (done) => {
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

  test("get patients as a doctor where doctor is valid", async (done) => {
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

  test("get patients as a doctor without authorization header should throw error", async (done) => {
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

  test("add a valid patient to a new valid doctor", async (done) => {
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

  test("add an existing doctor patient relationship should have no effect", async (done) => {
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
});
