const { Patient } = require("../../models/index");

const seed = async () => {
  await Patient.create({
		id: 1,
		fname: "Patient",
		lname: "One",
		email: "patient1@gmail.com",
		password: "Password123",
		flag: 1,
  });

  await Patient.create({
		id: 2,
		fname: "Patient",
		lname: "Two",
		email: "patient2@gmail.com",
		password: "Password123",
		flag: 2,
  });

  await Patient.create({
    id: 3,
    fname: "Ben",
    lname: "Parker",
    email: "ben.parker@marvel.com",
    password: "Password123",
  });
};

module.exports = seed;
