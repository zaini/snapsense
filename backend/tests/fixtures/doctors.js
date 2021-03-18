const { Doctor } = require("../../models/index");

const seed = async () => {
  await new Doctor({
    id: 1,
    fname: "Doctor",
    lname: "One",
    email: "doctor1@nhs.net",
    password: "Password123",
    hospital_id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).save();

  await new Doctor({
    id: 2,
    fname: "Doctor",
    lname: "Two",
    email: "doctor2@nhs.net",
    password: "Password123",
    hospital_id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).save();
};

module.exports = seed;
