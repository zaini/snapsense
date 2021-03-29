const { Admin } = require("../../models/index");

const seed = async () => {
  await Admin.create({
    id: 1,
    fname: "Admin",
    lname: "One",
    email: "admin1@gmail.com",
    password: "Password123",
    hospital_id: 1,
  });
  await Admin.create({
    id: 2,
    fname: "Admin",
    lname: "Two",
    email: "admin2@gmail.com",
    password: "Password123",
    hospital_id: 2,
  });
};

module.exports = seed;
