const { Hospital } = require("../../models/index");

describe("Hospital Model Test", () => {
  it("should save a valid hospital", async (done) => {
    const hospitalSave = await new Hospital({
      name: "Test Hospital",
      contact_email: "test_hospital@mail.com",
    }).save();

    const hospital = await Hospital.findOne({
      where: {
        contact_email: "test_hospital@mail.com",
      },
    });

    // Delete times because there is a weird error where the milliseconds are slightly different
    delete hospitalSave.dataValues.updatedAt;
    delete hospitalSave.dataValues.createdAt;
    delete hospital.dataValues.updatedAt;
    delete hospital.dataValues.createdAt;

    expect(hospital.dataValues).toMatchObject(hospitalSave.dataValues);
    done();
  });

  it("should throw an error on null name", async (done) => {
    await expect(
      Hospital.create({
        name: null,
        contact_email: "test_hospital@mail.com",
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on empty name", async (done) => {
    await expect(
      Hospital.create({
        name: "",
        contact_email: "test_hospital@mail.com",
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on long name", async (done) => {
    await expect(
      Hospital.create({
        name:
          "ThisIsAVeryLongHospitalNamekgaskdgajsghdljafsduyfuyfuaygsdouyasasqwefbuiozxf",
        contact_email: "test_hospital@mail.com",
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on short name", async (done) => {
    await expect(
      Hospital.create({
        name: "AI",
        contact_email: "test_hospital@mail.com",
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on invalid email syntax", async (done) => {
    await expect(
      Hospital.create({
        name: "Test Hospital",
        contact_email: "@mail.com",
      })
    ).rejects.toThrow();
    done();
  });

  it("shoudl throw an error on null email", async (done) => {
    await expect(
      Hospital.create({
        name: "Test Hospital",
        contact_email: null,
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on empty email", async (done) => {
    await expect(
      Hospital.create({
        name: "Test Hospital",
        contact_email: "",
      })
    ).rejects.toThrow();
    done();
  });

  it("should throw an error on duplicated email", async (done) => {
    await expect(
      Hospital.create({
        name: "London Test Hospital",
        contact_email: "london.hospital@mail.com",
      })
    ).rejects.toThrow();
    done();
  });
});
