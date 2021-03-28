"use strict";
const { Model } = require("sequelize");
const { Validator } = require("../utils/validator");
const ModelValidator = Validator();

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.Submission, { foreignKey: "submission_id" });
    }
  }
  Image.init(
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNotEmpty(value) {
            if (ModelValidator.isEmpty(value)) {
              throw new Error("Invalid image url");
            }
          },
        },
      },
      submission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
