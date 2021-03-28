const { Patient } = require("../../models/index");

describe("Patient Model Test", () => {
  it("should save a valid patient", async (done) => {
    const patientSave = await new Patient({
      fname: "John",
      lname: "Doe",
      email: "johndoe@gmail.com",
      password: "12345ABCDEfghi!",
    }).save();

    const patient = await Patient.findOne({
      where: {
        email: "johndoe@gmail.com",
      },
    });

    // Delete times because there is a weird error where the milliseconds are slightly different
    delete patientSave.dataValues.updatedAt;
    delete patientSave.dataValues.createdAt;
    delete patient.dataValues.updatedAt;
    delete patient.dataValues.createdAt;

    expect(patient.dataValues).toMatchObject(patientSave.dataValues);
    done();
  });

  it("should throw an error on null first name", async (done) => {
    await expect(
      Patient.create({
        fname: null,
        lname: "Doe",
        email: "johndoe@gmail.com",
        password: "12345ABCDEfghi!",
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on null last name", async (done) => {
    await expect(
      Patient.create({
        fname: "John",
        lname: null,
        email: "johndoe@gmail.com",
        password: "12345ABCDEfghi!",
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on empty first name", async (done) => {
    await expect(
      Patient.create({
        fname: "",
        lname: "Doe",
        email: "johndoe@gmail.com",
        password: "12345ABCDEfghi!",
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on empty last name", async (done) => {
    await expect(
      Patient.create({
        fname: "John",
        lname: "",
        email: "johndoe@gmail.com",
        password: "12345ABCDEfghi!",
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on invalid email syntax", async (done) => {
    await expect(
      Patient.create({
        fname: "John",
        lname: "Doe",
        email: "@gmail.com",
        password: "12345ABCDEfghi!",
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on null email", async (done) => {
    await expect(
      Patient.create({
        fname: "John",
        lname: "Doe",
        email: null,
        password: "12345ABCDEfghi!",
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on empty email", async (done) => {
    await expect(
      Patient.create({
        fname: "John",
        lname: "Doe",
        email: "",
        password: "12345ABCDEfghi!",
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on duplicated email", async (done) => {
    await expect(
      Patient.create({
        fname: "John",
        lname: "Doe",
        email: "patient1@gmail.com",
        password: "12345ABCDEfghi!",
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on null password", async (done) => {
    await expect(
      Patient.create({
        fname: "John",
        lname: "Doe",
        email: "johndoe@gmail.com",
        password: null,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on empty password", async (done) => {
    await expect(
      Patient.create({
        fname: "John",
        lname: "Doe",
        email: "johndoe@gmail.com",
        password: "",
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on invalid password syntax", async (done) => {
    await expect(
      Patient.create({
        fname: "John",
        lname: "Doe",
        email: "johndoe@gmail.com",
        password: "lowercase123",
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on short password", async (done) => {
    await expect(
      Patient.create({
        fname: "John",
        lname: "Doe",
        email: "johndoe@gmail.com",
        password: "Shrt1",
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on long password", async (done) => {
    await expect(
      Patient.create({
        fname: "John",
        lname: "Doe",
        email: "johndoe@gmail.com",
        password: "LongPassword1235618120",
      })
    ).rejects.toThrow();
    done();
  });
});
