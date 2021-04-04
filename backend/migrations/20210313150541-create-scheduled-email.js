"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ScheduledEmails", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      to: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      subject: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      html: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      altbody: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      template: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ScheduledEmails");
  },
};
