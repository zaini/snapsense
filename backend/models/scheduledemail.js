'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ScheduledEmail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ScheduledEmail.init({
    to: DataTypes.STRING,
    subject: DataTypes.STRING,
    html: DataTypes.TEXT,
    altbody: DataTypes.TEXT,
    template: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ScheduledEmail',
  });
  return ScheduledEmail;
};