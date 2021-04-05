const {
  getRequestsAsPatient,
  getRequestsAsDoctor,
} = require("./util/requestsHelpers");

let superAdminToken,
  adminToken,
  doctorOneToken,
  doctorTwoToken,
  patientOneToken,
  patientTwoToken,
  patientThreeToken,
  patientFourToken;

describe("requests resolvers", () => {
  beforeAll(async (done) => {
    const {
      superAdmin,
      admin,
      doctorOne,
      doctorTwo,
      patientOne,
      patientTwo,
      patientThree,
      patientFour,
    } = await require("./util/authTokens");

    superAdminToken = superAdmin;
    adminToken = admin;
    doctorOneToken = doctorOne;
    doctorTwoToken = doctorTwo;
    patientOneToken = patientOne;
    patientTwoToken = patientTwo;
    patientThreeToken = patientThree;
    patientFourToken = patientFour;

    done();
  });

  it("should get requests as the logged in patient", async (done) => {
    const response = await getRequestsAsPatient(patientOneToken);
    const { body } = response;
    expect(body).toMatchObject({
      data: {
        getRequestsAsPatient: [
          {
            Doctor: { email: "doctor1@nhs.net" },
            Patient: { email: "patient1@gmail.com" },
            Submission: { id: "1" },
            deadline: "1609804800000",
            fulfilled: "1609718400000",
          },
        ],
      },
    });
    done();
  });

  it("should return empty array if logged in patient has no requests", async (done) => {
    const response = await getRequestsAsPatient(patientFourToken);
    const { body } = response;
    expect(body).toMatchObject({
      data: {
        getRequestsAsPatient: [],
      },
    });
    done();
  });

  it("should throw error if getRequestsAsPatient is called with an invalid login token", async (done) => {
    const response = await getRequestsAsPatient("invalidlogintoken");
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Invalid Login Token");
    done();
  });

	it("should get requests as the logged in doctor", async (done) => {
    const response = await getRequestsAsDoctor(doctorOneToken);
    const { body } = response;
    expect(body).toMatchObject({
      data: {
        getRequestsAsDoctor: [
          {
            Doctor: { email: "doctor1@nhs.net" },
            Patient: { email: "patient1@gmail.com" },
            Submission: { id: "1" },
            deadline: "1609804800000",
            fulfilled: "1609718400000",
          },
        ],
      },
    });
    done();
  });

	it("should return empty array if logged in doctor has no requests", async (done) => {
    const response = await getRequestsAsDoctor(patientFourToken);
    const { body } = response;
    expect(body).toMatchObject({
      data: {
        getRequestsAsDoctor: [],
      },
    });
    done();
  });

	it("should throw error if getRequestsAsDoctor is called with an invalid login token", async (done) => {
    const response = await getRequestsAsDoctor("invalidlogintoken");
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Invalid Login Token");
    done();
  });
});
