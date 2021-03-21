"use strict";
const { Model, ValidationError } = require("sequelize");
const { Validator } = require("../utils/validator");
const argon2 = require("argon2");

const ModelValidator = Validator();

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Admin.belongsTo(models.Hospital, { foreignKey: "hospital_id" });
    }
  }
  Admin.init(
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
      hospital_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Admin",
    }
  );

  Admin.beforeSave(async (user, options) => {
    options.validate = false;
    user.email = user.email.toLowerCase();
    user.password = await argon2.hash(user.password);
  });

  return Admin;
};
