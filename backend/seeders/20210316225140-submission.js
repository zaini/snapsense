"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Submissions",
      [
        {
          id: 1,
          patient_id: 1,
          flag: 1,
          createdAt: new Date(new Date().getFullYear(), 0, 4),
          updatedAt: new Date(new Date().getFullYear(), 0, 4),
        },
        {
          id: 2,
          patient_id: 2,
          flag: null,
          createdAt: new Date(new Date().getFullYear(), 0, 8),
          updatedAt: new Date(new Date().getFullYear(), 0, 8),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Submissions");
  },
};
