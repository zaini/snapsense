const { DataTypes } = require("sequelize");

const sequelize = require("../db");

const Hospital = () => {
  return sequelize.define("hospital", {
    hospital_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    hospital_name: DataTypes.STRING,
    hospital_contact_email: DataTypes.STRING
  });
};

module.exports = Hospital();
