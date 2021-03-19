const { Submission } = require("../../models/index");

const seed = async () => {
  await new Submission({
    id: 1,
    patient_id: 1,
    flag: 1,
    createdAt: new Date(new Date().getFullYear(), 0, 4),
    updatedAt: new Date(new Date().getFullYear(), 0, 4),
  }).save();

  await new Submission({
    id: 2,
    patient_id: 2,
    flag: null,
    createdAt: new Date(new Date().getFullYear(), 0, 8),
    updatedAt: new Date(new Date().getFullYear(), 0, 8),
  }).save();
};

module.exports = seed;
