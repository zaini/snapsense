const { Admin } = require("../../models/index");

const seed = async () => {
  await new Admin({
    id: 1,
    fname: "Admin",
    lname: "One",
    email: "admin1@gmail.com",
    password: "Password123",
    hospital_id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).save();

  await new Admin({
    id: 2,
    fname: "Admin",
    lname: "Two",
    email: "admin2@gmail.com",
    password: "Password123",
    hospital_id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).save();
};

module.exports = seed;
