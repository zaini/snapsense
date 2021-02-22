"use strict";
const { Model } = require("sequelize");
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
      Admin.hasMany(models.Doctor, { foreignKey: "admin_id" });
    }
  }
  Admin.init(
    {
      fname: DataTypes.STRING,
      lname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      hospital_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Admin",
    }
  );
  return Admin;
};
