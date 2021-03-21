const { Hospital, Doctor } = require("../../models/index");

describe("Doctor Model Test", () => {
  it("should save a valid doctor", async (done) => {
    const doctorSave = await new Doctor({
      fname: "Ivan",
      lname: "Ivanov",
      email: "ivan.ivanov@nhs.net",
      password: "Abradabra123",
      hospital_id: 1,
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
    await expect(
      Doctor.create({
        fname: null,
        lname: "Ivanov",
        email: "ivan.ivanov@nhs.net",
        password: "Abradabra123",
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on null last name", async (done) => {
    await expect(
      Doctor.create({
        fname: "Ivan",
        lname: null,
        email: "ivan.ivanov@nhs.net",
        password: "Abradabra123",
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on empty first name", async (done) => {
    await expect(
      Doctor.create({
        fname: "",
        lname: "Ivanov",
        email: "ivan.ivanov@nhs.net",
        password: "Abradabra123",
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on empty last name", async (done) => {
    await expect(
      Doctor.create({
        fname: "Ivan",
        lname: "",
        email: "ivan.ivanov@nhs.net",
        password: "Abradabra123",
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on invalid email syntax", async (done) => {
    await expect(
      Doctor.create({
        fname: "Ivan",
        lname: "Ivanov",
        email: "hasgjdhags",
        password: "Abradabra123",
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on invalid email domain", async (done) => {
    await expect(
      Doctor.create({
        fname: "Ivan",
        lname: "Ivanov",
        email: "ivan.ivanov@gmail.com",
        password: "Abradabra123",
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on null email", async (done) => {
    await expect(
      Doctor.create({
        fname: "Ivan",
        lname: "Ivanov",
        email: null,
        password: "Abradabra123",
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on empty email", async (done) => {
    await expect(
      Doctor.create({
        fname: "Ivan",
        lname: "Ivanov",
        email: "",
        password: "Abradabra123",
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on duplicated email", async (done) => {
    await expect(
      Doctor.create({
        fname: "Ivan",
        lname: "Ivanov",
        email: "john.smith@nhs.net",
        password: "Abradabra123",
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on null password", async (done) => {
    await expect(
      Doctor.create({
        fname: "Ivan",
        lname: "Ivanov",
        email: "ivan.ivanov@nhs.net",
        password: null,
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on empty password", async (done) => {
    await expect(
      Doctor.create({
        fname: "Ivan",
        lname: "Ivanov",
        email: "ivan.ivanov@nhs.net",
        password: "",
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on invalid password syntax", async (done) => {
    await expect(
      Doctor.create({
        fname: "Ivan",
        lname: "Ivanov",
        email: "ivan.ivanov@nhs.net",
        password: "lowecaseonlypassword",
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on short password", async (done) => {
    await expect(
      Doctor.create({
        fname: "Ivan",
        lname: "Ivanov",
        email: "ivan.ivanov@nhs.net",
        password: "Shrt1",
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on long password", async (done) => {
    await expect(
      Doctor.create({
        fname: "Ivan",
        lname: "Ivanov",
        email: "ivan.ivanov@nhs.net",
        password: "Iamtryingtomakeaverylongpasswordwithdigits123456",
        hospital_id: 1,
      })
    ).rejects.toThrow();
    done();
  });

  it("should delete doctor if hospital is deleted", async (done) => {    
    const hospital = await Hospital.findByPk(1);
    await hospital.destroy();

    const doctorFind = await Doctor.findByPk(1);
    expect(doctorFind).toBeNull();
    done();
  });
});
