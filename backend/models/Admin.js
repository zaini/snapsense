const { DataTypes } = require("sequelize");
const Hospital = require("./Hospital");

const sequelize = require("../db");

const Admin = () => {
  const admin = sequelize.define("admin", {
    admin_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    admin_fname: DataTypes.STRING,
    admin_lname: DataTypes.STRING,
    admin_email: DataTypes.STRING,
    admin_password: DataTypes.STRING,
    admin_date_joined: DataTypes.DATE,
  });
  admin.belongsTo(Hospital, { foreignKey: "hospital_id" });
  return admin;
};

module.exports = Admin();
