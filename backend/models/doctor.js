"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor.belongsTo(models.Admin, { foreignKey: "admin_id" });
      Doctor.belongsToMany(models.Patient, {
        through: "Doctor_Patient_Relation",
        foreignKey: "doctor_id",
      });
      Doctor.hasMany(models.Submission, { foreignKey: "doctor_id" });
    }
  }
  Doctor.init(
    {
      fname: DataTypes.STRING,
      lname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      admin_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Doctor",
    }
  );
  return Doctor;
};
