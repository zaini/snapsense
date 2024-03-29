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
      Submission.hasMany(models.Request, { foreignKey: "submission_id" });
      Submission.belongsTo(models.Patient, { foreignKey: "patient_id" });
    }
  }
  Submission.init(
    {
      patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      flag: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Submission",
    }
  );
  return Submission;
};
