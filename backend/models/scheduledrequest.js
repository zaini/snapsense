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
    }
  };
  ScheduledRequest.init({
    startDate: DataTypes.DATEONLY,
    interval: DataTypes.INTEGER,
    frequency: DataTypes.INTEGER,
    request_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ScheduledRequest',
  });
  return ScheduledRequest;
};