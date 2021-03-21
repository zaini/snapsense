const { Admin } = require("../../models/index");

const seed = async () => {
  await Admin.create({
    id: 1,
    fname: "Jane",
    lname: "Smith",
    email: "jane.smith@mail.com",
    password: "MyPassword123",
    hospital_id: 1,
  });
  await Admin.create({
    id: 2,
    fname: "Joahn",
    lname: "Smith",
    email: "joahn.smith@mail.com",
    password: "MyPassword123",
    hospital_id: 1,
  });
};

module.exports = seed;
