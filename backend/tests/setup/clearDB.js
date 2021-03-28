// Util file to delete all data from the database, ran before each test

const {
  Admin,
  Answer,
  Doctor,
  Feedback,
  Patient,
  Submission,
  SuperAdmin,
  Image,
  Hospital,
  Question,
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

  await Answer.destroy({
    where: {},
    truncate: { cascade: true },
  });

  await Doctor_Patient_Relation.destroy({
    where: {},
    truncate: { cascade: true },
  });

  await Request.destroy({
    where: {},
    trucate: { cascade: true },
  })

  await SuperAdmin.destroy({
    where: {},
    truncate: { cascade: true },
  });

  await Feedback.destroy({
    where: {},
    truncate: { cascade: true },
  });
};

module.exports = deleteAll;
