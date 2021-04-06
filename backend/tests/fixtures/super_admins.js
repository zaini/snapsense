const { SuperAdmin } = require("../../models/index");

const seed = async () => {
  await SuperAdmin.create({
    id: 1,
    name: "SnapSense",
    email: "snapsense@gmail.com",
    password: "Password123",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

module.exports = seed;
