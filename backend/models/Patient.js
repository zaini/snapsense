const { DataTypes } = require("sequelize");

// Example Patient model from database to be used in the resolvers
// Potentially using https://sequelize.org/

// example:

const patient_model = (sequelize) => {
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

module.exports = patient_model;
