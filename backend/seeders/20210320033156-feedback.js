"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Feedbacks",
      [
        {
          id: 1,
          stars: 5,
          extra: "I love SnapSense so much!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          stars: 5,
          extra: "My foot doesn't hurt anymore",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          stars: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          stars: 4,
          extra: "They have a very nice website!!!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Feedbacks");
  },
};
