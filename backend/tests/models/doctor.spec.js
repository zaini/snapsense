const { Hospital, Doctor } = require("../../models/index");

describe("Doctor Model Test", () => {
  it("should save a valid doctor", async (done) => {
    const hospital = await new Hospital({
      name: "Test Hospital",
      contact_email: "test_hospital@mail.com",
    }).save();

    const doctorSave = await new Doctor({
      fname: "Ivan",
      lname: "Ivanov",
      email: "ivan.ivanov@nhs.net",
      password: "Abradabra123",
      hospital_id: hospital.getDataValue("id"),
    }).save();

    const doctor = await Doctor.findOne({
      where: {
        email: "ivan.ivanov@nhs.net",
      },
    });

    // Delete times because there is a weird error where the milliseconds are slightly different
    delete doctorSave.dataValues.updatedAt;
    delete doctorSave.dataValues.createdAt;
    delete doctor.dataValues.updatedAt;
    delete doctor.dataValues.createdAt;

    expect(doctor.dataValues).toMatchObject(doctorSave.dataValues);
    done();
  });

  it("should throw an error on null first name", async (done) => {
    const hospital = await new Hospital({
      name: "Test Hospital",
      contact_email: "test_hospital@mail.com",
    }).save();

    await expect(
      Doctor.create({
        fname: null,
        lname: "Ivanov",
        email: "ivan.ivanov@nhs.net",
        password: "Abradabra123",
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
      Doctor.create({
        fname: "Ivan",
        lname: null,
        email: "ivan.ivanov@nhs.net",
        password: "Abradabra123",
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
      Doctor.create({
        fname: "",
        lname: "Ivanov",
        email: "ivan.ivanov@nhs.net",
        password: "Abradabra123",
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
      Doctor.create({
        fname: "Ivan",
        lname: "",
        email: "ivan.ivanov@nhs.net",
        password: "Abradabra123",
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
      Doctor.create({
        fname: "Ivan",
        lname: "Ivanov",
        email: "hasgjdhags",
        password: "Abradabra123",
        hospital_id: hospital.getDataValue("id"),
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on invalid email domain", async (done) => {
    const hospital = await new Hospital({
      name: "Test Hospital",
      contact_email: "test_hospital@mail.com",
    }).save();

    await expect(
      Doctor.create({
        fname: "Ivan",
        lname: "Ivanov",
        email: "ivan.ivanov@gmail.com",
        password: "Abradabra123",
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
      Doctor.create({
        fname: "Ivan",
        lname: "Ivanov",
        email: null,
        password: "Abradabra123",
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
      Doctor.create({
        fname: "Ivan",
        lname: "Ivanov",
        email: "",
        password: "Abradabra123",
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

    const doctor = await new Doctor({
      fname: "Ivan",
      lname: "Ivanov",
      email: "ivan.ivanov@nhs.net",
      password: "Abradabra123",
      hospital_id: hospital.getDataValue("id"),
    }).save();

    await expect(
      Doctor.create({
        fname: "Ivan",
        lname: "Ivanov",
        email: "ivan.ivanov@nhs.net",
        password: "Abradabra123",
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
      Doctor.create({
        fname: "Ivan",
        lname: "Ivanov",
        email: "ivan.ivanov@nhs.net",
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
      Doctor.create({
        fname: "Ivan",
        lname: "Ivanov",
        email: "ivan.ivanov@nhs.net",
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
      Doctor.create({
        fname: "Ivan",
        lname: "Ivanov",
        email: "ivan.ivanov@nhs.net",
        password: "lowecaseonlypassword",
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
      Doctor.create({
        fname: "Ivan",
        lname: "Ivanov",
        email: "ivan.ivanov@nhs.net",
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
      Doctor.create({
        fname: "Ivan",
        lname: "Ivanov",
        email: "ivan.ivanov@nhs.net",
        password: "Iamtryingtomakeaverylongpasswordwithdigits123456",
        hospital_id: hospital.getDataValue("id"),
      })
    ).rejects.toThrow();
    done();
  });
});
