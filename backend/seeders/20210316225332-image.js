"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Images",
      [
        {
          id: 1,
          url:
            "https://snapsensebucket.s3.ap-south-1.amazonaws.com/af618fa0-e7b5-47e7-ac3c-2137ba4ba4e4.jpg",
          submission_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          url:
            "https://snapsensebucket.s3.ap-south-1.amazonaws.com/af618fa0-e7b5-47e7-ac3c-2137ba4ba4e4.jpg",
          submission_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Images");
  },
};
