const request = require("supertest");

const app = require("../../index");

describe("patient resolvers", () => {
  test("get a patient as a doctor where the patient belongs to the doctor", async (done) => {
    const loginResponse = await request(app).post("/graphql").send({
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
    const loginResponse = await request(app).post("/graphql").send({
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
    const loginResponse = await request(app).post("/graphql").send({
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
});
