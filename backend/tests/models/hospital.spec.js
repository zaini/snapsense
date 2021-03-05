const { Hospital } = require("../../models/index");

it("should save a valid doctor", async (done) => {
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