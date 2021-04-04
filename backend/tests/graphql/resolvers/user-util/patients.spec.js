const {
  deleteAccountRequest,
  changePasswordRequest,
} = require("./helperRequests");

let patientToken;

describe("patient utility functions resolvers", () => {
  beforeAll(async (done) => {
    const { patientOne } = await require("../util/authTokens");
    patientToken = patientOne;

    done();
  });

  // Account deletion
  it("should not delete patient if provided incorrect password", async (done) => {
    const response = await deleteAccountRequest(
      "Password1234",
      "Password1234",
      patientToken
    );

    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Incorrect password!");

    done();
  });

  it("should not delete patient if password and password confirmation do not match", async (done) => {
    const response = await deleteAccountRequest(
      "Password1234",
      "Password123",
      patientToken
    );

    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Password must match password confirmation!");

    done();
  });

  it("should not delete patient if not authenticated", async (done) => {
    const response = await deleteAccountRequest("Password123", "Password123");

    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Invalid Login Token");

    done();
  });

  it("should delete patient if password and password confirmation match and authenticated", async (done) => {
    const response = await deleteAccountRequest(
      "Password123",
      "Password123",
      patientToken
    );

    const {
      body: {
        data: { deleteAccount },
      },
    } = response;

    expect(deleteAccount).toBe(true);

    done();
  });

  // Change password
  it("should not change patient password if password and password confirmation don't match", async (done) => {
    const response = await changePasswordRequest(
      "BrandNewPassword123",
      "BrandNewPassword1234",
      patientToken
    );

    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Password must match password confirmation!");

    done();
  });

  it("should not change patient password if not authenticated", async (done) => {
    const response = await changePasswordRequest(
      "BrandNewPassword123",
      "BrandNewPassword123"
    );

    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Invalid Login Token");

    done();
  });

  it("should change patient password if password and password confirmation match and authenticated", async (done) => {
    const response = await changePasswordRequest(
      "BrandNewPassword123",
      "BrandNewPassword123",
      patientToken
    );

    const {
      body: {
        data: { changePassword },
      },
    } = response;

    expect(changePassword).toBe(true);

    done();
  });
});
