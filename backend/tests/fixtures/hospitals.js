const { Hospital } = require("../../models/index");

const seed = async () => {
  await Hospital.create({
    id: 1,
    name: "London Hospital",
    contact_email: "london.hospital@mail.com",
  });

  await Hospital.create({
    id: 2,
    name: "London Hospital 2",
    contact_email: "london.hospital.two@mail.com",
  });

  await Hospital.create({
    id: 3,
    name: "London Hospital 3",
    contact_email: "london.hospital.three@mail.com",
  });
};

module.exports = seed;
