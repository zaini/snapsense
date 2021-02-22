"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patient.belongsToMany(models.Doctor, {
        through: "Doctor_Patient_Relation",
        foreignKey: "patient_id",
      });
      Patient.hasMany(models.Submission, { foreignKey: "patient_id" });
    }
  }
  Patient.init(
    {
      fname: DataTypes.STRING,
      lname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Patient",
    }
  );
  return Patient;
};
