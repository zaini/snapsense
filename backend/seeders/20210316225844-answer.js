"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Answers",
      [
        {
          id: 1,
          question_id: 1,
          submission_id: 1,
          value: true,
          extra: "My foot hurts",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          question_id: 2,
          submission_id: 1,
          value: true,
          extra: "My foot still hurts",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          question_id: 3,
          submission_id: 1,
          value: false,
          extra: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          question_id: 4,
          submission_id: 1,
          value: false,
          extra: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          question_id: 5,
          submission_id: 1,
          value: true,
          extra: "My foot still hurts",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 6,
          question_id: 6,
          submission_id: 1,
          value: true,
          extra: "HELP!!!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 7,
          question_id: 7,
          submission_id: 1,
          value: true,
          extra: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 8,
          question_id: 8,
          submission_id: 1,
          value: true,
          extra: "I might die, just saying",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Answers");
  },
};
