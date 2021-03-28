// Util file to delete all data from the database, ran before each test

const {
  Admin,
  Doctor,
  Patient,
  Submission,
  Image,
  Hospital,
  Doctor_Patient_Relation,
  Answer,
  Question,
  Request,
} = require("../../models/index");

const deleteAll = async () => {
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

  
  await Question.destroy({
    where: {},
    trucate: { cascade: true },
  })


  await Submission.destroy({
    where: {},
    truncate: { cascade: true },
  });

  await Image.destroy({
    where: {},
    truncate: { cascade: true },
  });

  await Answer.destroy({
    where: {},
    trucate: { cascade: true },
  });

  await Doctor_Patient_Relation.destroy({
    where: {},
    truncate: { cascade: true },
  });

  await Request.destroy({
    where: {},
    trucate: { cascade: true },
  })

};

module.exports = deleteAll;
