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

global.beforeEach(async () => {
  await Hospital.destroy({
    where: {},
    truncate: { cascade: true },
  });

  await Admin.destroy({
    where: {},
    truncate: { cascade: true },
  });

  await Doctor.destroy({
    where: {},
    truncate: { cascade: true },
  });

  await Patient.destroy({
    where: {},
    truncate: { cascade: true },
  });

  await Submission.destroy({
    where: {},
    truncate: { cascade: true },
  });

  await Image.destroy({
    where: {},
    truncate: { cascade: true },
  });

  await Doctor_Patient_Relation.destroy({
    where: {},
    truncate: { cascade: true },
  });
});
