"use strict";
const { Model, ValidationError } = require("sequelize");
const { Validator } = require("../utils/validator");
const argon2 = require("argon2");

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
      Patient.hasMany(models.Request, { foreignKey: "patient_id" });
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
              throw new ValidationError("Invalid name");
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
              throw new ValidationError("Invalid name");
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
              throw new ValidationError("Invalid email address");
            }
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isPassword(value) {
            if (!ModelValidator.isPassword(value)) {
              throw new ValidationError("Invalid password");
            }
          },
        },
      },
      flag: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Patient",
    }
  );

  Patient.beforeSave(async (user, options) => {
    options.validate = false;
    user.email = user.email.toLowerCase();
    if (user.changed("password")) {
      user.password = await argon2.hash(user.password);
    }
  });

  return Patient;
};
