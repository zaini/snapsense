const {
  deleteAccountRequest,
  changePasswordRequest,
} = require("./helperRequests");

let doctorToken;

describe("doctor utility functions resolvers", () => {
  beforeAll(async (done) => {
    const { doctorOne } = await require("../util/authTokens");
    doctorToken = doctorOne;

    done();
  });

  // Account deletion
  test("should not delete doctor if provided incorrect password", async (done) => {
    const response = await deleteAccountRequest(
      "Password1234",
      "Password1234",
      doctorToken
    );

    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Incorrect password!");

    done();
  });

  test("should not delete doctor if password and password confirmation do not match", async (done) => {
    const response = await deleteAccountRequest(
      "Password1234",
      "Password123",
      doctorToken
    );

    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Password must match password confirmation!");

    done();
  });

  test("should not delete doctor if not authenticated", async (done) => {
    const response = await deleteAccountRequest("Password123", "Password123");

    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Invalid Login Token");

    done();
  });

  test("should delete doctor if password and password confirmation match and authenticated", async (done) => {
    const response = await deleteAccountRequest(
      "Password123",
      "Password123",
      doctorToken
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
  test("should not change doctor password if password and password confirmation don't match", async (done) => {
    const response = await changePasswordRequest(
      "BrandNewPassword123",
      "BrandNewPassword1234",
      doctorToken
    );

    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Password must match password confirmation!");

    done();
  });

  test("should not change doctor password if not authenticated", async (done) => {
    const response = await changePasswordRequest(
      "BrandNewPassword123",
      "BrandNewPassword123"
    );

    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Invalid Login Token");

    done();
  });

  test("should change doctor password if password and password confirmation match and authenticated", async (done) => {
    const response = await changePasswordRequest(
      "BrandNewPassword123",
      "BrandNewPassword123",
      doctorToken
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
