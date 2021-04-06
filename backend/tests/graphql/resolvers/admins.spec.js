const request = require("supertest");

const app = require("../../../index");

let superAdminToken, adminToken;

describe("admins resolvers", () => {
  beforeAll(async (done) => {
    const { superAdmin, admin } = await require("./util/authTokens");
    superAdminToken = superAdmin;
    adminToken = admin;

		done();
  });

  it("should create admin as a super-admin", async (done) => {
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

  it("should should not create admin if not logged in", async (done) => {
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

  it("should should not create admin if not logged in as a super-admin", async (done) => {
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

  it("should delete valid admin as super admin", async (done) => {
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

  it("should throw error if trying to delete invalid admin", async (done) => {
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

  it("should not delete admin if not logged in as a super admin", async (done) => {
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

  it("should not delete admin if not logged in", async (done) => {
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

  it("should get all admins as a super-admin", async (done) => {
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
          { fname: "Admin", lname: "One", email: "admin1@gmail.com" },
          { fname: "Admin", lname: "Two", email: "admin2@gmail.com" },
        ],
      },
    });

    done();
  });

  it("should not get all admins if not logged in as a super-admin", async (done) => {
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

  it("should not get all admins if not logged in", async (done) => {
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

  it("should get admin by ID as a super-admin", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					query {
						getAdminById(admin_id: "1") {
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
        getAdminById: {
          fname: "Admin",
          lname: "One",
          email: "admin1@gmail.com",
        },
      },
    });

    done();
  });

  it("should throw error on get admin by ID where admin is invalid", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					query {
						getAdminById(admin_id: "100") {
							fname
							lname
							email
						}
					}								
				`,
      })
      .set("authorization", `Bearer ${superAdminToken}`);

    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Admin does not exist!");

    done();
  });

  it("should not get admin by ID if not logged in as a super-admin", async (done) => {
    const response = await request(app)
      .post("/graphql")
      .send({
        query: `
					query {
						getAdminById(admin_id: "1") {
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

  it("should not get an admin by ID if not logged in", async (done) => {
    const response = await request(app).post("/graphql").send({
      query: `
				query {
					getAdminById(admin_id: "1") {
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
