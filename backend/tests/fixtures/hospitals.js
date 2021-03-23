const { Hospital } = require("../../models/index");

const seed = async () => {
  await new Hospital({
    id: 1,
    name: "Hospital One",
    contact_email: "hospital.one@hospitals.uk",
    createdAt: new Date(),
    updatedAt: new Date(),
  }).save();

  await new Hospital({
    id: 2,
    name: "Hospital Two",
    contact_email: "hospital.two@hospitals.uk",
    createdAt: new Date(),
    updatedAt: new Date(),
  }).save();
};

module.exports = seed;
