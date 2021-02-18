const { DataTypes } = require("sequelize");

const sequelize = require("../db");

const Patient = () => {
  const patient = sequelize.define("patient", {
    patient_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    patient_fname: DataTypes.STRING,
    patient_lname: DataTypes.STRING,
    patient_email: DataTypes.STRING,
    patient_password: DataTypes.STRING,
    patient_date_joined: DataTypes.DATE,
  });
  return patient;
};

module.exports = Patient();
