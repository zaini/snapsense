const { Patient } = require("../../models/index");

it("should save a valid patient", async (done) => {
  const patientSave = await new Patient({
    fname: "John",
    lname: "Do",
    email: "johndo@gmail.com",
    password: "12345ABCDEfghi!",
  }).save();

  const patient = await Patient.findOne({
    where: {
      email: "johndo@gmail.com",
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
