const { Hospital, Admin } = require("../../models/index");

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