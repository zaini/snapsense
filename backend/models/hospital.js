"use strict";
const { Model } = require("sequelize");
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
    }
  }
  Hospital.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isCorrectLength(value) {
            if (ModelValidator.isLong(value, 75) || ModelValidator.isShort(value, 10)) {
              throw new Error("Invalid name");
            }
          }
        },
      },
      contact_email: {
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
    },
    {
      sequelize,
      modelName: "Hospital",
    }
  );
  return Hospital;
};
