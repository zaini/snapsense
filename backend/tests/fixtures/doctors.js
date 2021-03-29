const { Doctor } = require("../../models/index");

const seed = async () => {
  await Doctor.create({
    id: 1,
    fname: "Doctor",
    lname: "One",
    email: "doctor1@nhs.net",
    password: "Password123",
    hospital_id: 1,
  });

  await Doctor.create({
    id: 2,
    fname: "Doctor",
    lname: "Two",
    email: "doctor2@nhs.net",
    password: "Password123",
    hospital_id: 2,
  });

  await Doctor.create({
    id: 3,
    fname: "Jacob",
    lname: "Smith",
    email: "jacob.smith@nhs.net",
    password: "Password123",
    hospital_id: 3,
  });

  await Doctor.create({
    id: 4,
    fname: "Jarvis",
    lname: "Smith",
    email: "jarvis.smith@nhs.net",
    password: "Password123",
    hospital_id: 3,
  });
};

module.exports = seed;
