const { SuperAdmin } = require("../../models/index");

describe("Super Admin Model Test", () => {
  it("should save a valid superadmin", async (done) => {
    const superAdminSave = await new SuperAdmin({
      name: "SuperAdmin",
      email: "superadmin@mail.com",
      password: "AdminPass123",
    }).save();

    const superAdmin = await SuperAdmin.findOne({
      where: { email: "superadmin@mail.com" },
    });

    delete superAdminSave.dataValues.updatedAt;
    delete superAdminSave.dataValues.createdAt;
    delete superAdmin.dataValues.updatedAt;
    delete superAdmin.dataValues.createdAt;

    expect(superAdmin.dataValues).toMatchObject(superAdminSave.dataValues);
    done();
  });

  it("should throw an error on short name", async (done) => {
    await expect(
      SuperAdmin.create({
        name: "S",
        email: "superadmin@mail.com",
        password: "AdminPass123",
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on long name", async (done) => {
    await expect(
      SuperAdmin.create({
        name: "IBelieveThatsAVeryLongNameForASuperAdminModelTesting",
        email: "superadmin@mail.com",
        password: "AdminPass123",
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on name containing illegal characters", async (done) => {
    await expect(
      SuperAdmin.create({
        name: "Sn@psens3",
        email: "superadmin@mail.com",
        password: "AdminPass123",
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on null name", async (done) => {
    await expect(
      SuperAdmin.create({
        name: null,
        email: "superadmin@mail.com",
        password: "AdminPass123",
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on empty name", async (done) => {
    await expect(
      SuperAdmin.create({
        name: "",
        email: "superadmin@mail.com",
        password: "AdminPass123",
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on invalid email syntax", async (done) => {
    await expect(
      SuperAdmin.create({
        name: "SuperAdmin",
        email: "@mail.com",
        password: "AdminPass123",
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on null email", async (done) => {
    await expect(
      SuperAdmin.create({
        name: "SuperAdmin",
        email: null,
        password: "AdminPass123",
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on empty email", async (done) => {
    await expect(
      SuperAdmin.create({
        name: "SuperAdmin",
        email: "",
        password: "AdminPass123",
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on null password", async (done) => {
    await expect(
      SuperAdmin.create({
        name: "SuperAdmin",
        email: "superadmin@mail.com",
        password: null,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on empty password", async (done) => {
    await expect(
      SuperAdmin.create({
        name: "SuperAdmin",
        email: "superadmin@mail.com",
        password: "",
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on invalid password syntax", async (done) => {
    await expect(
      SuperAdmin.create({
        name: "SuperAdmin",
        email: "superadmin@mail.com",
        password: "128312312",
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on short password", async (done) => {
    await expect(
      SuperAdmin.create({
        name: "SuperAdmin",
        email: "superadmin@mail.com",
        password: "Shrt1",
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on long password", async (done) => {
    await expect(
      SuperAdmin.create({
        name: "SuperAdmin",
        email: "superadmin@mail.com",
        password: "LongPassword1235618120",
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on duplicated email", async (done) => {
    await expect(
      SuperAdmin.create({
        name: "SuperAdmin",
        email: "snapsense@gmail.com",
        password: "AdminPass123",
      })
    ).rejects.toThrow();
    done();
  });
});
