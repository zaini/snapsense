"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Submission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Submission.hasMany(models.Image, { foreignKey: "submission_id" });
      Submission.hasMany(models.Answer, { foreignKey: "submission_id" });
      Submission.hasOne(models.Request, { foreignKey: "submission_id" });
    }
  }
  Submission.init(
    {
      patient_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Submission",
    }
  );
  return Submission;
};
