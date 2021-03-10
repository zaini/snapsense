"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Request.belongsTo(models.Patient, { foreignKey: "patient_id" });
      Request.belongsTo(models.Doctor, { foreignKey: "doctor_id" });
      Request.belongsTo(models.Submission, { foreignKey: "submission_id" });
    }
  }
  Request.init(
    {
      doctor_id: DataTypes.INTEGER,
      patient_id: DataTypes.INTEGER,
      type: DataTypes.INTEGER,
      deadline: DataTypes.DATE,
      fulfilled: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      submission_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Request",
    }
  );
  return Request;
};
