"use strict";
const { Model } = require("sequelize");
const { Validator } = require("../utils/validator");

const ModelValidator = Validator();

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
            if (!ModelValidator.isEmail(value, true)) {
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
      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Doctor",
    }
  );
  return Doctor;
};
