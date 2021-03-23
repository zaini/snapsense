const { Doctor_Patient_Relation } = require("../../models/index");

const seed = async () => {
  await new Doctor_Patient_Relation({
    id: 1,
    patient_id: 1,
    doctor_id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).save();

  await new Doctor_Patient_Relation({
    id: 2,
    patient_id: 2,
    doctor_id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).save();
};

module.exports = seed;
