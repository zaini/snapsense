const { Hospital, Admin, Doctor } = require("../../models/index");

it("should save a valid doctor", async (done) => {
  const hospital = await new Hospital({
    name: "Test Hospital",
    contact_email: "test_hospital@mail.com",
  }).save();

  const admin = await new Admin({
    fname: "Alex",
    lname: "Alexovich",
    email: "alex.alexovich@mail.com",
    password: "AdminPass123",
    hospital_id: hospital.getDataValue("id"),
  }).save();
  
  const doctorSave = await new Doctor({
    fname: "Ivan",
    lname: "Ivanov",
    email: "ivan.ivanov@nhs.co.uk",
    password: "Abradabra123",
    admin_id: admin.getDataValue("id"),
  }).save();

  const doctor = await Doctor.findOne({
    where: {
      email: "ivan.ivanov@nhs.co.uk",
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
