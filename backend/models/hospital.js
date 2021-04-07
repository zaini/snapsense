"use strict";
const { Model, ValidationError } = require("sequelize");
const { Validator } = require("../utils/validator");

const ModelValidator = Validator();

module.exports = (sequelize, DataTypes) => {
  class Hospital extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hospital.hasMany(models.Admin, { foreignKey: "hospital_id" });
      Hospital.hasMany(models.Doctor, { foreignKey: "hospital_id" });
    }
  }
  Hospital.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isCorrectLength(value) {
            if (!ModelValidator.isWithinRange(value.length, 10, 75)) {
              throw new ValidationError("Invalid name");
            }
          },
        },
      },
      contact_email: {
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
    },
    {
      sequelize,
      modelName: "Hospital",
    }
  );
  return Hospital;
};
