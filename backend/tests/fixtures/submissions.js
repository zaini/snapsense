const { Submission } = require("../../models/index");

const seed = async () => {
  await Submission.create({
    id: 1,
    patient_id: 1,
    flag: 1,
    createdAt: new Date(new Date().getFullYear(), 0, 4),
    updatedAt: new Date(new Date().getFullYear(), 0, 4),
  });

  await Submission.create({
    id: 2,
    patient_id: 2,
    flag: null,
    createdAt: new Date(new Date().getFullYear(), 0, 8),
    updatedAt: new Date(new Date().getFullYear(), 0, 8),
  });
  await Submission.create({
    id: 3,
    patient_id: 3,
    flag: null,
    createdAt: new Date(new Date().getFullYear(), 0, 8),
    updatedAt: new Date(new Date().getFullYear(), 0, 8),
  });
};

module.exports = seed;
