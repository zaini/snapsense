'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ScheduledRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ScheduledRequest.belongsTo(models.Request, { foreignKey: "request_id" });
      ScheduledRequest.belongsTo(models.Patient, { foreignKey: "patient_id" });
      ScheduledRequest.belongsTo(models.Doctor, { foreignKey: "doctor_id" });

    }
  };
  ScheduledRequest.init({
    startDate: DataTypes.DATEONLY,
    interval: DataTypes.INTEGER,
    frequency: DataTypes.INTEGER,
    request_id: DataTypes.INTEGER,
    patient_id: DataTypes.INTEGER,
    doctor_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ScheduledRequest',
  });
  return ScheduledRequest;
};