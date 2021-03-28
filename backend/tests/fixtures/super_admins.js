const { SuperAdmin } = require("../../models/index");

const seed = async () => {
  await new SuperAdmin({
    id: 1,
    name: "SnapSense",
    email: "snapsense@gmail.com",
    password: "Password123",
    createdAt: new Date(),
    updatedAt: new Date(),
  }).save();
};

module.exports = seed;
