const { Hospital, Admin } = require("../../models/index");

describe("Admin Model Test", () => {
  it("should save a valid doctor", async (done) => {
    const hospital = await new Hospital({
      name: "Test Hospital",
      contact_email: "test_hospital@mail.com",
    }).save();

    const adminSave = await new Admin({
      fname: "Alex",
      lname: "Alexovich",
      email: "alex.alexovich@mail.com",
      password: "AdminPass123",
      hospital_id: hospital.getDataValue("id"),
    }).save();

    const admin = await Admin.findOne({
      where: {
        email: "alex.alexovich@mail.com",
      },
    });

    // Delete times because there is a weird error where the milliseconds are slightly different
    delete adminSave.dataValues.updatedAt;
    delete adminSave.dataValues.createdAt;
    delete admin.dataValues.updatedAt;
    delete admin.dataValues.createdAt;

    expect(admin.dataValues).toMatchObject(adminSave.dataValues);
    done();
  });

  it("should throw an error on null first name", async (done) => {
    const hospital = await new Hospital({
      name: "Test Hospital",
      contact_email: "test_hospital@mail.com",
    }).save();

    await expect(
      Admin.create({
        fname: null,
        lname: "Alexovich",
        email: "alex.alexovich@mail.com",
        password: "AdminPassword123",
        hospital_id: hospital.getDataValue("id"),
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on null last name", async (done) => {
    const hospital = await new Hospital({
      name: "Test Hospital",
      contact_email: "test_hospital@mail.com",
    }).save();

    await expect(
      Admin.create({
        fname: "Alex",
        lname: null,
        email: "alex.alexovich@mail.com",
        password: "AdminPassword123",
        hospital_id: hospital.getDataValue("id"),
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on empty first name", async (done) => {
    const hospital = await new Hospital({
      name: "Test Hospital",
      contact_email: "test_hospital@mail.com",
    }).save();

    await expect(
      Admin.create({
        fname: "",
        lname: "Alexovich",
        email: "alex.alexovich@mail.com",
        password: "AdminPassword123",
        hospital_id: hospital.getDataValue("id"),
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on empty last name", async (done) => {
    const hospital = await new Hospital({
      name: "Test Hospital",
      contact_email: "test_hospital@mail.com",
    }).save();

    await expect(
      Admin.create({
        fname: "Alex",
        lname: "",
        email: "alex.alexovich@mail.com",
        password: "AdminPassword123",
        hospital_id: hospital.getDataValue("id"),
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on invalid email syntax", async (done) => {
    const hospital = await new Hospital({
      name: "Test Hospital",
      contact_email: "test_hospital@mail.com",
    }).save();

    await expect(
      Admin.create({
        fname: "Alex",
        lname: "Alexovich",
        email: "@mail.com",
        password: "AdminPassword123",
        hospital_id: hospital.getDataValue("id"),
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on null email", async (done) => {
    const hospital = await new Hospital({
      name: "Test Hospital",
      contact_email: "test_hospital@mail.com",
    }).save();

    await expect(
      Admin.create({
        fname: "Alex",
        lname: "Alexovich",
        email: null,
        password: "AdminPassword123",
        hospital_id: hospital.getDataValue("id"),
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on empty email", async (done) => {
    const hospital = await new Hospital({
      name: "Test Hospital",
      contact_email: "test_hospital@mail.com",
    }).save();

    await expect(
      Admin.create({
        fname: "Alex",
        lname: "Alexovich",
        email: "",
        password: "AdminPassword123",
        hospital_id: hospital.getDataValue("id"),
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on duplicated email", async (done) => {
    const hospital = await new Hospital({
      name: "Test Hospital",
      contact_email: "test_hospital@mail.com",
    }).save();

    const admin = await new Admin({
      fname: "Alex",
      lname: "Alexovich",
      email: "alex.alexovich@mail.com",
      password: "AdminPassword123",
      hospital_id: hospital.getDataValue("id"),
    }).save();

    await expect(
      Admin.create({
        fname: "Alex",
        lname: "Alexovich",
        email: "alex.alexovich@mail.com",
        password: "AdminPassword456",
        hospital_id: hospital.getDataValue("id"),
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on null password", async (done) => {
    const hospital = await new Hospital({
      name: "Test Hospital",
      contact_email: "test_hospital@mail.com",
    }).save();

    await expect(
      Admin.create({
        fname: "Alex",
        lname: "Alexovich",
        email: "alex.alexovich@mail.com",
        password: null,
        hospital_id: hospital.getDataValue("id"),
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on empty password", async (done) => {
    const hospital = await new Hospital({
      name: "Test Hospital",
      contact_email: "test_hospital@mail.com",
    }).save();

    await expect(
      Admin.create({
        fname: "Alex",
        lname: "Alexovich",
        email: "alex.alexovich@mail.com",
        password: "",
        hospital_id: hospital.getDataValue("id"),
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on invalid password syntax", async (done) => {
    const hospital = await new Hospital({
      name: "Test Hospital",
      contact_email: "test_hospital@mail.com",
    }).save();

    await expect(
      Admin.create({
        fname: "Alex",
        lname: "Alexovich",
        email: "alex.alexovich@mail.com",
        password: "lowercase123",
        hospital_id: hospital.getDataValue("id"),
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on short password", async (done) => {
    const hospital = await new Hospital({
      name: "Test Hospital",
      contact_email: "test_hospital@mail.com",
    }).save();

    await expect(
      Admin.create({
        fname: "Alex",
        lname: "Alexovich",
        email: "alex.alexovich@mail.com",
        password: "Shrt1",
        hospital_id: hospital.getDataValue("id"),
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on long password", async (done) => {
    const hospital = await new Hospital({
      name: "Test Hospital",
      contact_email: "test_hospital@mail.com",
    }).save();

    await expect(
      Admin.create({
        fname: "Alex",
        lname: "Alexovich",
        email: "alex.alexovich@mail.com",
        password: "LongPassword1235618120",
        hospital_id: hospital.getDataValue("id"),
      })
    ).rejects.toThrow();
    done();
  });
  
});
