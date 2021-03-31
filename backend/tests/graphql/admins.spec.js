const request = require("supertest");

const app = require("../../index");

let superAdminToken;
let adminToken;

describe("admins resolvers", () => {
  beforeAll(async (done) => {
    // Login and get the access tokens for various users needed in this test suite
    superAdminToken = await request(app).post("/graphql").send({
      query: `
				mutation {
					login(
						email: "snapsense@gmail.com"
						password: "Password123"
						account_type: "SUPERADMIN"
					)	
					{
						accessToken
					}
				}
			`,
    });

    superAdminToken = superAdminToken.body.data.login.accessToken;

    adminToken = await request(app).post("/graphql").send({
      query: `
				mutation {
					login(
						email: "admin1@gmail.com"
						password: "Password123"
						account_type: "ADMIN"
					)	
					{
						accessToken
					}
				}
			`,
    });

    adminToken = adminToken.body.data.login.accessToken;

    done();
  });

  test("should create admin as a super-admin", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					mutation {
						createAdmin(
							fname: "Jerry"
							lname: "Seinfeld"
							email: "bob@sacamano.com"
							password: "Password123"
							hospital_id: 1
						) {
							fname
							lname
							email
							Hospital {
								id
							}
						}
					}						
				`,
      })
      .set("authorization", `Bearer ${superAdminToken}`);

    const { body } = response;

    expect(body).toMatchObject({
      data: {
        createAdmin: {
          fname: "Jerry",
          lname: "Seinfeld",
          email: "bob@sacamano.com",
          Hospital: { id: "1" },
        },
      },
    });

    done();
  });

  test("should should not create admin if not logged in", async (done) => {
    const response = await request(app).post("/graphql").send({
      query: `
					mutation {
						createAdmin(
							fname: "Jerry"
							lname: "Seinfeld"
							email: "bob@sacamano.com"
							password: "Password123"
							hospital_id: 1
						) {
							fname
							lname
							email
							Hospital {
								id
							}
						}
					}						
				`,
    });

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Missing Authorization Header");
    done();
  });

  test("should should not create admin if not logged in as a super-admin", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					mutation {
						createAdmin(
							fname: "Jerry"
							lname: "Seinfeld"
							email: "bob@sacamano.com"
							password: "Password123"
							hospital_id: 1
						) {
							fname
							lname
							email
							Hospital {
								id
							}
						}
					}						
				`,
      })
      .set("authorization", `Bearer ${adminToken}`);

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Invalid user account type!");
    done();
  });

  test("should delete valid admin as super admin", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					mutation {
						deleteAdmin(admin_id: "1")
					}
			`,
      })
      .set("authorization", `Bearer ${superAdminToken}`);

    const {
      body: {
        data: { deleteAdmin },
      },
    } = response;

    expect(deleteAdmin).toBe(true);
    done();
  });

  test("should throw error if trying to delete invalid admin", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					mutation {
						deleteAdmin(admin_id: "100")
					}
			`,
      })
      .set("authorization", `Bearer ${superAdminToken}`);

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("This admin does not exist.");
    done();
  });

  test("should not delete admin if not logged in as a super admin", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					mutation {
						deleteAdmin(admin_id: "1")
					}
			`,
      })
      .set("authorization", `Bearer ${adminToken}`);

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Invalid user account type!");
    done();
  });

  test("should not delete admin if not logged in", async (done) => {
    const response = await request(app).post("/graphql").send({
      query: `
				mutation {
					deleteAdmin(admin_id: "1")
				}
			`,
    });

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Missing Authorization Header");
    done();
  });

  test("should get all admins as a super-admin", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					query {
						getAdmins{
							fname
							lname
							email
						}
					}					
				`,
      })
      .set("authorization", `Bearer ${superAdminToken}`);

    const { body } = response;

    expect(body).toMatchObject({
      data: {
        getAdmins: [
          { fname: "Admin", lname: "Two", email: "admin2@gmail.com" },
        ],
      },
    });

    done();
  });

  test("should not get all admins if not logged in as a super-admin", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					query {
						getAdmins{
							fname
							lname
							email
						}
					}					
				`,
      })
      .set("authorization", `Bearer ${adminToken}`);

    const errorMessage = response.body.errors[0].message;

    expect(errorMessage).toMatch("Invalid user account type!");
    done();
  });

  test("should not get all admins if not logged", async (done) => {
    const response = await request(app).post("/graphql").send({
      query: `
					query {
						getAdmins{
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
});
