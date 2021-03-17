"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Hospitals",
      [
        {
          id: 1,
          name: "Hospital One",
          contact_email: "hospital.one@hospitals.uk",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: "Hospital Two",
          contact_email: "hospital.two@hospitals.uk",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Hospitals");
  },
};
