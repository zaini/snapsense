const request = require("supertest");

const app = require("../../index");

let superAdminToken,
  adminToken,
  patientOneToken,
  patientTwoToken,
  patientFourToken;

describe("doctors resolvers", () => {
  beforeAll(async (done) => {
    const {
      superAdmin,
      admin,
      patientOne,
      patientTwo,
      patientFour,
    } = await require("./util/authTokens");

    superAdminToken = superAdmin;
    adminToken = admin;
    patientOneToken = patientOne;
    patientTwoToken = patientTwo;
    patientFourToken = patientFour;

    done();
  });

  test("should get the logged in admin's doctors", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					query {
						getDoctorsAsAdmin {
							fname
							lname
							email
						}
					}			
				`,
      })
      .set("authorization", `Bearer ${adminToken}`);

    const { body } = response;

    expect(body).toMatchObject({
      data: {
        getDoctorsAsAdmin: [
          {
            fname: "Doctor",
            lname: "One",
            email: "doctor1@nhs.net",
          },
        ],
      },
    });
    done();
  });

  test("should throw error if not logged in and trying to get doctors as an admin", async (done) => {
    const response = await request(app).post("/graphql").send({
      query: `
					query {
						getDoctorsAsAdmin {
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

  test("should get the logged in patient's doctors #1", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					query {
						getDoctorsAsPatient {
							fname
							lname
							email
						}
					}			
				`,
      })
      .set("authorization", `Bearer ${patientOneToken}`);

    const { body } = response;

    expect(body).toMatchObject({
      data: {
        getDoctorsAsPatient: [
          {
            fname: "Doctor",
            lname: "One",
            email: "doctor1@nhs.net",
          },
        ],
      },
    });
    done();
  });

  test("should get the logged in patient's doctors #2", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					query {
						getDoctorsAsPatient {
							fname
							lname
							email
						}
					}			
				`,
      })
      .set("authorization", `Bearer ${patientTwoToken}`);

    const { body } = response;

    expect(body).toMatchObject({
      data: {
        getDoctorsAsPatient: [
          {
            fname: "Doctor",
            lname: "Two",
            email: "doctor2@nhs.net",
          },
          {
            fname: "Jacob",
            lname: "Smith",
            email: "jacob.smith@nhs.net",
          },
          {
            fname: "Jarvis",
            lname: "Smith",
            email: "jarvis.smith@nhs.net",
          },
        ],
      },
    });
    done();
  });

  test("should return empty array if patient has no doctors and gets all their doctors", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					query {
						getDoctorsAsPatient {
							fname
							lname
							email
						}
					}			
				`,
      })
      .set("authorization", `Bearer ${patientFourToken}`);

    const { body } = response;

    expect(body).toMatchObject({
      data: {
        getDoctorsAsPatient: [],
      },
    });
    done();
  });

  test("should throw error if not logged in and trying to get doctors as a patient", async (done) => {
    const response = await request(app).post("/graphql").send({
      query: `
					query {
						getDoctorsAsPatient {
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

  test("should throw error if not logged in as a patient and trying to get doctors as a patient", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					query {
						getDoctorsAsPatient {
							fname
							lname
							email
						}
					}			
				`,
      })
      .set("authorization", `Bearer ${adminToken}`);

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch(
      "You are not logged into the correct account for this feature."
    );
    done();
  });

  test("should throw error if not logged in as an admin and trying to get doctors as an admin", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					query {
						getDoctorsAsAdmin {
							fname
							lname
							email
						}
					}			
				`,
      })
      .set("authorization", `Bearer ${patientOneToken}`);

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch(
      "You are not logged into the correct account for this feature."
    );
    done();
  });
});
