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
      patient_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      deadline: {
          type: DataTypes.DATE,
          allowNull: false
      },
      fulfilled: {
          type: DataTypes.DATE,
          allowNull: false
      }
    },
    {
      sequelize,
      modelName: "Submission",
    }
  );
  return Submission;
};
