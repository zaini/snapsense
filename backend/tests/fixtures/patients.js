const { Patient } = require("../../models/index");

const seed = async () => {
  await Patient.create({
    id: 1,
    fname: "Garry",
    lname: "Kasparov",
    email: "garry.kasparov@chess.com",
    password: "Password123",
  });

  await Patient.create({
    id: 2,
    fname: "Peter",
    lname: "Parker",
    email: "peter.parker@marvel.com",
    password: "Password123",
  });
};

module.exports = seed;
