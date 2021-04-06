const request = require("supertest");

const app = require("../../../index");

let superAdminToken, adminToken;

describe("hospitals resolvers", () => {
  beforeAll(async (done) => {
    const { superAdmin, admin } = await require("./util/authTokens");
    superAdminToken = superAdmin;
    adminToken = admin;

    done();
  });

  it("should get all hospitals as super-admin", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					query {
						getHospitals {
							name
							contact_email
						}
					}
			`,
      })
      .set("authorization", `Bearer ${superAdminToken}`);

    const { body } = response;

    expect(body).toMatchObject({
      data: {
        getHospitals: [
          {
            name: "London Hospital",
            contact_email: "london.hospital@mail.com",
          },
          {
            name: "London Hospital 2",
            contact_email: "london.hospital.two@mail.com",
          },
          {
            name: "London Hospital 3",
            contact_email: "london.hospital.three@mail.com",
          },
        ],
      },
    });
    done();
  });

  it("should not get all hospitals if not logged in", async (done) => {
    const response = await request(app).post("/graphql").send({
      query: `
					query {
						getHospitals {
							name
							contact_email
						}
					}
			`,
    });

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Missing Authorization Header");
    done();
  });

  it("should not get all hospitals if logged in as a user that's not a super admin", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					query {
						getHospitals {
							name
							contact_email
						}
					}
			`,
      })
      .set("authorization", `Bearer ${adminToken}`);

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Invalid user account type!");
    done();
  });

  it("should get specific hospital as super-admin", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					query {
						getSpecificHospital(hospital_id: "1") {
							name
							contact_email
						}
					}				
			`,
      })
      .set("authorization", `Bearer ${superAdminToken}`);

    const { body } = response;

    expect(body).toMatchObject({
      data: {
        getSpecificHospital: {
          name: "London Hospital",
          contact_email: "london.hospital@mail.com",
        },
      },
    });
    done();
  });

  it("should throw error on invalid hospital retrieval as super-admin", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					query {
						getSpecificHospital(hospital_id: "100") {
							name
							contact_email
						}
					}				
			`,
      })
      .set("authorization", `Bearer ${superAdminToken}`);

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Hospital does not exist");
    done();
  });

  it("should not get specific hospital if logged in as a user that's not a super admin", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					query {
						getSpecificHospital(hospital_id: "100") {
							name
							contact_email
						}
					}				
			`,
      })
      .set("authorization", `Bearer ${adminToken}`);

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Invalid user account type!");
    done();
  });

  it("should create hospital as a super-admin", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					mutation {
						createHospital(
							name: "KCL Hospital"
							contact_email: "kcl.hospital@kcl.ac.uk"
						) {
							name
							contact_email
						}
					}										
				`,
      })
      .set("authorization", `Bearer ${superAdminToken}`);

    const { body } = response;

    expect(body).toMatchObject({
      data: {
        createHospital: {
          name: "KCL Hospital",
          contact_email: "kcl.hospital@kcl.ac.uk",
        },
      },
    });

    done();
  });

  it("should should not create hospital if not logged in", async (done) => {
    const response = await request(app).post("/graphql").send({
      query: `
					mutation {
						createHospital(
							name: "KCL Hospital"
							contact_email: "kcl.hospital@kcl.ac.uk"
						) {
							name
							contact_email
						}
					}										
				`,
    });

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Missing Authorization Header");
    done();
  });

  it("should not create hospital if not logged in as a super-admin", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					mutation {
						createHospital(
							name: "KCL Hospital"
							contact_email: "kcl.hospital@kcl.ac.uk"
						) {
							name
							contact_email
						}
					}										
				`,
      })
      .set("authorization", `Bearer ${adminToken}`);

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Invalid user account type!");
    done();
  });

  it("should delete valid hospital as super", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					mutation {
						deleteHospital(hospital_id: "1")
					}
			`,
      })
      .set("authorization", `Bearer ${superAdminToken}`);

    const {
      body: {
        data: { deleteHospital },
      },
    } = response;

    expect(deleteHospital).toBe(true);
    done();
  });

  it("should throw error if trying to delete invalid hospital", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					mutation {
						deleteHospital(hospital_id: "100")
					}
			`,
      })
      .set("authorization", `Bearer ${superAdminToken}`);

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Hospital does not exist");
    done();
  });

  it("should not delete hospital if not logged in as a super admin", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					mutation {
						deleteHospital(hospital_id: "1")
					}
			`,
      })
      .set("authorization", `Bearer ${adminToken}`);

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Invalid user account type!");
    done();
  });

  it("should not delete hospital if not logged in", async (done) => {
    const response = await request(app).post("/graphql").send({
      query: `
				mutation {
					deleteHospital(hospital_id: "1")
				}
			`,
    });

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Missing Authorization Header");
    done();
  });
});
