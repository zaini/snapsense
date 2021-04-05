const {
  getRequestsAsPatient,
  getRequestsAsDoctor,
  getRequestsForReview,
  createRequest,
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

  it("should throw error if getRequestsAsPatient is called as a doctor", async (done) => {
    const response = await getRequestsAsPatient(doctorOneToken);
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch(
      "You are not logged into the correct account for this feature."
    );
    done();
  });

  it("should throw error if getRequestsAsPatient is called as an admin", async (done) => {
    const response = await getRequestsAsPatient(adminToken);
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch(
      "You are not logged into the correct account for this feature."
    );
    done();
  });

  it("should throw error if getRequestsAsPatient is called as a super-admin", async (done) => {
    const response = await getRequestsAsPatient(superAdminToken);
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch(
      "You are not logged into the correct account for this feature."
    );
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

  it("should return null if logged in doctor has no requests", async (done) => {
    const response = await getRequestsAsDoctor(patientFourToken);
    const { body } = response;
    expect(body).toMatchObject({
      data: {
        getRequestsAsDoctor: null,
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

  it("should throw error if getRequestsAsDoctor is called as a patient", async (done) => {
    const response = await getRequestsAsDoctor(patientOneToken);
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch(
      "You are not logged into the correct account for this feature."
    );
    done();
  });

  it("should throw error if getRequestsAsDoctor is called as an admin", async (done) => {
    const response = await getRequestsAsDoctor(adminToken);
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch(
      "You are not logged into the correct account for this feature."
    );
    done();
  });

  it("should throw error if getRequestsAsDoctor is called as a super-admin", async (done) => {
    const response = await getRequestsAsDoctor(superAdminToken);
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch(
      "You are not logged into the correct account for this feature."
    );
    done();
  });

  it("should get the requests the logged in doctor has to review", async (done) => {
    const response = await getRequestsForReview(doctorTwoToken);
    const { body } = response;
    expect(body).toMatchObject({
      data: {
        getRequestsForReview: [
          {
            Doctor: { email: "doctor2@nhs.net" },
            Patient: { email: "patient2@gmail.com" },
            Submission: { id: "2", flag: null }, // flag must be null as that means the doctor has not reviewed it
            deadline: "1610236800000",
            fulfilled: "1610064000000",
          },
        ],
      },
    });
    done();
  });

  it("should empty array if logged in doctor has no requests to review", async (done) => {
    const response = await getRequestsForReview(doctorOneToken);
    const { body } = response;
    expect(body).toMatchObject({
      data: {
        getRequestsForReview: [],
      },
    });
    done();
  });

  it("should not get requests to review as a patient", async (done) => {
    const response = await getRequestsForReview(patientOneToken);
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch(
      "You are not logged into the correct account for this feature."
    );
    done();
  });

  it("should not get requests to review as an admin", async (done) => {
    const response = await getRequestsForReview(adminToken);
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch(
      "You are not logged into the correct account for this feature."
    );
    done();
  });

  it("should not get requests to review as a super-admin", async (done) => {
    const response = await getRequestsForReview(superAdminToken);
    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch(
      "You are not logged into the correct account for this feature."
    );
    done();
  });

  it("should create a request as a doctor to a patient assigned to them", async (done) => {
    const tomorrow = new Date(new Date());
    tomorrow.setDate(tomorrow.getDate() + 1);
    const response = await createRequest(
      doctorOneToken,
      1,
      tomorrow.getTime(),
      1
    );

    const {
      body: {
        data: { createRequest: result },
      },
    } = response;
    expect(result).toBe(true);
    done();
  });

  it("should not create a request as a doctor to a patient not assigned to them", async (done) => {
    const tomorrow = new Date(new Date());
    tomorrow.setDate(tomorrow.getDate() + 1);
    const response = await createRequest(
      doctorOneToken,
      1,
      tomorrow.getTime(),
      2
    );

    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("This patient does not belong to you!");
    done();
  });

  it("should not create a request as a doctor to a non-existing patient", async (done) => {
    const tomorrow = new Date(new Date());
    tomorrow.setDate(tomorrow.getDate() + 1);
    const response = await createRequest(
      doctorOneToken,
      1,
      tomorrow.getTime(),
      200
    );

    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Invalid patient!");
    done();
  });

  it("should not create a request as a doctor with a frequency less than -1", async (done) => {
    const tomorrow = new Date(new Date());
    tomorrow.setDate(tomorrow.getDate() + 1);
    const response = await createRequest(
      doctorOneToken,
      1,
      tomorrow.getTime(),
      1,
      -1,
      1
    );

    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Invalid Frequency!");
    done();
  });

	it("should not create a request as a doctor with an interval less than -1", async (done) => {
    const tomorrow = new Date(new Date());
    tomorrow.setDate(tomorrow.getDate() + 1);
    const response = await createRequest(
      doctorOneToken,
      1,
      tomorrow.getTime(),
      1,
      1,
      -1
    );

    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Invalid Interval!");
    done();
  });

	it("should not create a request as a doctor with a frequency greater than 20", async (done) => {
    const tomorrow = new Date(new Date());
    tomorrow.setDate(tomorrow.getDate() + 1);
    const response = await createRequest(
      doctorOneToken,
      1,
      tomorrow.getTime(),
      1,
      21,
      1
    );

    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Invalid Frequency!");
    done();
  });

	it("should not create a request as a doctor with an interval less than 20", async (done) => {
    const tomorrow = new Date(new Date());
    tomorrow.setDate(tomorrow.getDate() + 1);
    const response = await createRequest(
      doctorOneToken,
      1,
      tomorrow.getTime(),
      1,
      1,
      21
    );

    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Invalid Interval!");
    done();
  });
});
