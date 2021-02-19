"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor_Patient_Relation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Doctor_Patient_Relation.init(
    {
      doctor_id: DataTypes.INTEGER,
      patient_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Doctor_Patient_Relation",
    }
  );
  return Doctor_Patient_Relation;
};
