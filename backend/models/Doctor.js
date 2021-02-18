const { DataTypes } = require("sequelize");

const Admin = require("./Admin");
const Patient = require("./Patient");

const sequelize = require("../db");

const Doctor = () => {
  const doctor = sequelize.define("doctor", {
    doctor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    doctor_fname: DataTypes.STRING,
    doctor_lname: DataTypes.STRING,
    doctor_email: DataTypes.STRING,
    doctor_password: DataTypes.STRING,
    doctor_date_joined: DataTypes.DATE,
  });
  doctor.belongsTo(Admin, { foreignKey: "admin_id" });
  doctor.belongsToMany(Patient, { through: 'doctor_patient_relations', foreignKey: 'doctor_id' });
  Patient.belongsToMany(doctor, { through: 'doctor_patient_relations', foreignKey: 'patient_id' });
  return doctor;
};

module.exports = Doctor();
