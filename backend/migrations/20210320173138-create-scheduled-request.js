'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ScheduledRequests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      startDate: {
        type: Sequelize.DATEONLY
      },
      interval: {
        type: Sequelize.INTEGER
      },
      frequency: {
        type: Sequelize.INTEGER
      },
      request_id: {
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "Requests",
          key: "id",
          as: "request_id"
        }
      },
      patient_id: {
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "Patients",
          key: "id",
          as: "patient_id"
        }
      },
      doctor_id: {
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "Doctors",
          key: "id",
          as: "doctor_id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ScheduledRequests');
  }
};