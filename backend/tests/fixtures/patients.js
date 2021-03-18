const { Patient } = require("../../models/index");

const seed = async () => {
  await new Patient({
    id: 1,
    fname: "Patient",
    lname: "One",
    email: "patient1@gmail.com",
    password:
      "Password123",
    flag: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).save();

  await new Patient({
    id: 2,
    fname: "Patient",
    lname: "Two",
    email: "patient2@gmail.com",
    password:
      "Password123",
    flag: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).save();
};

module.exports = seed;
