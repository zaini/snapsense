"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Requests",
      [
        {
          id: 1,
          doctor_id: 1,
          patient_id: 1,
          type: 3,
          submission_id: 1,
          deadline: new Date(new Date().getFullYear(), 0, 5),
          fulfilled: new Date(new Date().getFullYear(), 0, 4),
          createdAt: new Date(new Date().getFullYear(), 0, 3),
          updatedAt: new Date(new Date().getFullYear(), 0, 3),
        },
        {
          id: 2,
          doctor_id: 2,
          patient_id: 2,
          type: 1,
          submission_id: 2,
          deadline: new Date(new Date().getFullYear(), 0, 10),
          fulfilled: new Date(new Date().getFullYear(), 0, 8),
          createdAt: new Date(new Date().getFullYear(), 0, 7),
          updatedAt: new Date(new Date().getFullYear(), 0, 7),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Requests");
  },
};
