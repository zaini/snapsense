const request = require("supertest");

const app = require("../../../index");

// Login and get the access tokens for various users needed in testing
let superAdminToken,
  adminToken,
  doctorOneToken,
  patientOneToken,
  patientTwoToken;

module.exports = (async () => {
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

  return {
    superAdmin: superAdminToken,
    admin: adminToken,
    doctorOne: doctorOneToken,
    patientOne: patientOneToken,
    patientTwo: patientTwoToken,
  };
})();
