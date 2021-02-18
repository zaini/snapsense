const { DataTypes } = require("sequelize");

const sequelize = require("../db");

const Hospital = () => {
  const hospital = sequelize.define("hospital", {
    hospital_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    hospital_name: DataTypes.STRING,
    hospital_contact_email: DataTypes.STRING,
  });
  return hospital;
};

module.exports = Hospital();
