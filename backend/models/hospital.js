"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hospital extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hospital.hasMany(models.Admin);
    }
  }
  Hospital.init(
    {
      name: DataTypes.STRING,
      contact_email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Hospital",
    }
  );
  return Hospital;
};
