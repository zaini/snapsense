const { Doctor_Patient_Relation } = require("../../models/index");

const seed = async () => {
  await Doctor_Patient_Relation.create({
    id: 1,
    doctor_id: 2,
    patient_id: 2,
  });
  await Doctor_Patient_Relation.create({
    id: 2,
    doctor_id: 3,
    patient_id: 2,
  });
  await Doctor_Patient_Relation.create({
    id: 3,
    doctor_id: 4,
    patient_id: 2,
  });
};

module.exports = seed;
