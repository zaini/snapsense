const { Doctor } = require("../../models/index");

const seed = async () => {
  await Doctor.create({
    id: 1,
    fname: "John",
    lname: "Smith",
    email: "john.smith@nhs.net",
    password: "MyPassword123",
    hospital_id: 1,
  });

  await Doctor.create({
    id: 2,
    fname: "James",
    lname: "Smith",
    email: "james.smith@nhs.net",
    password: "MyPassword123",
    hospital_id: 2,
  });

  await Doctor.create({
    id: 3,
    fname: "Jacob",
    lname: "Smith",
    email: "jacob.smith@nhs.net",
    password: "MyPassword123",
    hospital_id: 3,
  });

  await Doctor.create({
    id: 4,
    fname: "Jarvis",
    lname: "Smith",
    email: "jarvis.smith@nhs.net",
    password: "MyPassword123",
    hospital_id: 3,
  });

};

module.exports = seed;
