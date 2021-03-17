"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Answer.belongsTo(models.Submission, { foreignKey: "submission_id" });
      Answer.belongsTo(models.Question, { foreignKey: "question_id" });
    }
  }
  Answer.init(
    {
      question_id: DataTypes.INTEGER,
      submission_id: DataTypes.INTEGER,
      value: DataTypes.BOOLEAN,
      extra: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Answer",
    }
  );
  return Answer;
};
