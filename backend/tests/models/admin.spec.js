const { Hospital, Admin } = require("../../models/index");

describe("Admin Model Test", () => {
  it("should save a valid admin", async (done) => {
    const adminSave = await new Admin({
      fname: "Alex",
      lname: "Alexovich",
      email: "alex.alexovich@mail.com",
      password: "AdminPass123",
      hospital_id: 1,
    }).save();

    const admin = await Admin.findOne({
      where: { email: "alex.alexovich@mail.com" },
    });

    // Delete times because there is a weird error where the milliseconds are slightly different
    delete adminSave.dataValues.updatedAt;
    delete adminSave.dataValues.createdAt;
    delete admin.dataValues.updatedAt;
    delete admin.dataValues.createdAt;

    expect(admin.dataValues).toMatchObject(adminSave.dataValues);
    done();
  });

  it("should throw an error on short first name", async (done) => {
    await expect(
      Admin.create({
        fname: "A",
        lname: "Alexovich",
        email: "alex.alexovich@mail.com",
        password: "AdminPassword123",
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on long first name", async (done) => {
    await expect(
      Admin.create({
        fname: "AVeryLongFirstNameForThisModelTesting",
        lname: "Alexovich",
        email: "alex.alexovich@mail.com",
        password: "AdminPassword123",
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on null first name", async (done) => {
    await expect(
      Admin.create({
        fname: null,
        lname: "Alexovich",
        email: "alex.alexovich@mail.com",
        password: "AdminPassword123",
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on empty first name", async (done) => {
    await expect(
      Admin.create({
        fname: "",
        lname: "Alexovich",
        email: "alex.alexovich@mail.com",
        password: "AdminPassword123",
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on first name containing illegal characters", async (done) => {
    await expect(
      Admin.create({
        fname: "@L3x",
        lname: "Alexovich",
        email: "alex.alexovich@mail.com",
        password: "AdminPassword123",
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on short last name", async (done) => {
    await expect(
      Admin.create({
        fname: "Alex",
        lname: "L",
        email: "alex.alexovich@mail.com",
        password: "AdminPassword123",
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on long last name", async (done) => {
    await expect(
      Admin.create({
        fname: "Alex",
        lname: "AVeryLongLastNameForThisModelTestingAdmin",
        email: "alex.alexovich@mail.com",
        password: "AdminPassword123",
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on null last name", async (done) => {
    await expect(
      Admin.create({
        fname: "Alex",
        lname: null,
        email: "alex.alexovich@mail.com",
        password: "AdminPassword123",
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on empty last name", async (done) => {
    await expect(
      Admin.create({
        fname: "Alex",
        lname: "",
        email: "alex.alexovich@mail.com",
        password: "AdminPassword123",
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on last name containing illegal characters", async (done) => {
    await expect(
      Admin.create({
        fname: "Alex",
        lname: "@L3xovich",
        email: "alex.alexovich@mail.com",
        password: "AdminPassword123",
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on invalid email syntax", async (done) => {
    await expect(
      Admin.create({
        fname: "Alex",
        lname: "Alexovich",
        email: "@mail.com",
        password: "AdminPassword123",
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on null email", async (done) => {
    await expect(
      Admin.create({
        fname: "Alex",
        lname: "Alexovich",
        email: null,
        password: "AdminPassword123",
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on empty email", async (done) => {
    await expect(
      Admin.create({
        fname: "Alex",
        lname: "Alexovich",
        email: "",
        password: "AdminPassword123",
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on duplicated email", async (done) => {
    await expect(
      Admin.create({
        fname: "Alex",
        lname: "Alexovich",
        email: "admin1@gmail.com",
        password: "AdminPassword123",
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on null password", async (done) => {
    await expect(
      Admin.create({
        fname: "Alex",
        lname: "Alexovich",
        email: "alex.alexovich@mail.com",
        password: null,
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on empty password", async (done) => {
    await expect(
      Admin.create({
        fname: "Alex",
        lname: "Alexovich",
        email: "alex.alexovich@mail.com",
        password: "",
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on invalid password syntax", async (done) => {
    await expect(
      Admin.create({
        fname: "Alex",
        lname: "Alexovich",
        email: "alex.alexovich@mail.com",
        password: "lowercase123",
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on short password", async (done) => {
    await expect(
      Admin.create({
        fname: "Alex",
        lname: "Alexovich",
        email: "alex.alexovich@mail.com",
        password: "Shrt1",
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on long password", async (done) => {
    await expect(
      Admin.create({
        fname: "Alex",
        lname: "Alexovich",
        email: "alex.alexovich@mail.com",
        password: "LongPassword1235618120",
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should delete an admin if hospital is deleted", async (done) => {
    const hospital = await Hospital.findByPk(1);
    await hospital.destroy();

    const adminFind = await Admin.findByPk(1);
    await expect(adminFind).toBeNull();
    done();
  });
});
