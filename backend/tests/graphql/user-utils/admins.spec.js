const {
  deleteAccountRequest,
  changePasswordRequest,
} = require("./helperRequests");

let adminToken;

describe("admin utility functions resolvers", () => {
  beforeAll(async (done) => {
    const { admin } = await require("../util/authTokens");
    adminToken = admin;

    done();
  });

  // Account deletion
  test("should not delete admin if provided incorrect password", async (done) => {
    const response = await deleteAccountRequest(
      "Password1234",
      "Password1234",
      adminToken
    );

    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Incorrect password!");

    done();
  });

  test("should not delete admin if password and password confirmation do not match", async (done) => {
    const response = await deleteAccountRequest(
      "Password1234",
      "Password123",
      adminToken
    );

    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Password must match password confirmation!");

    done();
  });

  test("should not delete admin if not authenticated", async (done) => {
    const response = await deleteAccountRequest("Password123", "Password123");

    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Invalid Login Token");

    done();
  });

  test("should delete admin if password and password confirmation match and authenticated", async (done) => {
    const response = await deleteAccountRequest(
      "Password123",
      "Password123",
      adminToken
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
  test("should not change admin password if password and password confirmation don't match", async (done) => {
    const response = await changePasswordRequest(
      "BrandNewPassword123",
      "BrandNewPassword1234",
      adminToken
    );

    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Password must match password confirmation!");

    done();
  });

  test("should not change admin password if not authenticated", async (done) => {
    const response = await changePasswordRequest(
      "BrandNewPassword123",
      "BrandNewPassword123"
    );

    const errorMessage = response.body.errors[0].message;
    expect(errorMessage).toMatch("Invalid Login Token");

    done();
  });

  test("should change admin password if password and password confirmation match and authenticated", async (done) => {
    const response = await changePasswordRequest(
      "BrandNewPassword123",
      "BrandNewPassword123",
      adminToken
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
