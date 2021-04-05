const { Request } = require("../../models/index");

const seed = async () => {
  await Request.create({
    id: 1,
    doctor_id: 1,
    patient_id: 1,
    type: 3,
    submission_id: 1,
    deadline: new Date(new Date().getFullYear(), 0, 5),
    fulfilled: new Date(new Date().getFullYear(), 0, 4),
    createdAt: new Date(new Date().getFullYear(), 0, 3),
    updatedAt: new Date(new Date().getFullYear(), 0, 3),
  });

  await Request.create({
    id: 2,
    doctor_id: 2,
    patient_id: 2,
    type: 2,
    submission_id: 2,
    deadline: new Date(new Date().getFullYear(), 0, 10),
    fulfilled: new Date(new Date().getFullYear(), 0, 8),
    createdAt: new Date(new Date().getFullYear(), 0, 7),
    updatedAt: new Date(new Date().getFullYear(), 0, 7),
  });

  await Request.create({
    id: 3,
    doctor_id: 3,
    patient_id: 3,
    type: 1,
    submission_id: 3,
    deadline: new Date(new Date().getFullYear(), 0, 10),
    fulfilled: new Date(new Date().getFullYear(), 0, 8),
    createdAt: new Date(new Date().getFullYear(), 0, 7),
    updatedAt: new Date(new Date().getFullYear(), 0, 7),
  });
};

module.exports = seed;
