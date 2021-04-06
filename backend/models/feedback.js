"use strict";
const { Model, ValidationError } = require("sequelize");
const { Validator } = require("../utils/validator");
const ModelValidator = Validator();
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Feedback.init(
    {
      stars: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isValidStarNumber(value) {
            if (!ModelValidator.isWithinRange(value, 0,5)) {
              throw new ValidationError(
                "Invalid number of stars, must be between 0-5 (inclusive)"
              );
            }
          },
        },
      },
      extra: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Feedback",
    }
  );
  return Feedback;
};
