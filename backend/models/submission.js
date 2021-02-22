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
      Submission.belongsTo(models.Patient, { foreignKey: "patient_id" });
      Submission.belongsTo(models.Doctor, { foreignKey: "doctor_id" });
      Submission.hasMany(models.Image, { foreignKey: "submission_id" });
    }
  }
  Submission.init(
    {
      patient_id: DataTypes.INTEGER,
      doctor_id: DataTypes.INTEGER,
      deadline: DataTypes.DATE,
      fulfilled: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Submission",
    }
  );
  return Submission;
};
