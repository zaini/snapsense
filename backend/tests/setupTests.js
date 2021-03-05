// Util function that clears the database that should be ran before each test
const {
  Admin,
  Doctor,
  Patient,
  Submission,
  Image,
  Hospital,
  Doctor_Patient_Relation,
} = require("../models/index");

  Admin.destroy({
    where: {},
    truncate: true,
  });

  Doctor.destroy({
    where: {},
    truncate: true,
  });

  Patient.destroy({
    where: {},
    truncate: true,
  });

  Submission.destroy({
    where: {},
    truncate: true,
  });

  Image.destroy({
    where: {},
    truncate: true,
  });

  Hospital.destroy({
    where: {},
    truncate: true,
  });

  Doctor_Patient_Relation.destroy({
    where: {},
    truncate: true,
  });

