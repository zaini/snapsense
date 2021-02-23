"use strict";
const { Model } = require("sequelize");
const { Validator } = require("../utils/validator");

const ModelValidator = Validator();

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
      fname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isName(value) {
            if (!ModelValidator.isName(value)) {
              throw new Error("Invalid name");
            }
          },
        },
      },
      lname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isName(value) {
            if (!ModelValidator.isName(value)) {
              throw new Error("Invalid name");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail(value) {
            if (!ModelValidator.isEmail(value)) {
              throw new Error("Invalid email address");
            }
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNotEmpty(value) {
            if (ModelValidator.isEmpty(value)) {
              throw new Error("Invalid password");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Patient",
    }
  );
  return Patient;
};
