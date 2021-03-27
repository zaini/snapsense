const request = require("supertest");

const app = require("../../index");

let loginResponse;

describe("patient resolvers", () => {
  test("doctor should login", async (done) => {
    loginResponse = await request(app).post("/graphql").send({
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
    done();
  });

  test("get a patient as a doctor where the patient belongs to the doctor", async (done) => {
    const {
      data: {
        login: { accessToken },
      },
    } = loginResponse.body;

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
      .set("authorization", `Bearer ${accessToken}`);

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
    const {
      data: {
        login: { accessToken },
      },
    } = loginResponse.body;

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
      .set("authorization", `Bearer ${accessToken}`);

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Invalid patient!");
    done();
  });

  test("get a patient as a doctor where the patient does not exist", async (done) => {
    const {
      data: {
        login: { accessToken },
      },
    } = loginResponse.body;

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
      .set("authorization", `Bearer ${accessToken}`);

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Invalid patient!");
    done();
  });

  test("get patient as a doctor without authorization header should throw error", async (done) => {
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
    const {
      data: {
        login: { accessToken },
      },
    } = loginResponse.body;

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
      .set("authorization", `Bearer ${accessToken}`);

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

  test("add a valid patient to a valid doctor", async (done) => {
    // Login as a patient
    const patientLogin = await request(app).post("/graphql").send({
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

    const {
      data: {
        login: { accessToken },
      },
    } = patientLogin.body;

    // Add the patient to a new doctor
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
      .set("authorization", `Bearer ${accessToken}`);

    const {
      data: { addPatientToDoctor: result },
    } = response.body;

    // Make sure the result was successful
    expect(result).toBe(true);

    // Get the doctor's access token
    const doctorAccessToken = loginResponse.body.data.login.accessToken;

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
      .set("authorization", `Bearer ${doctorAccessToken}`);

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
});
