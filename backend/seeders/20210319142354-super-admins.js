"use strict";

// Password for all users in the seeds files are "Password123"
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "SuperAdmins",
      [
        {
          id: 1,
          name: "SnapSense",
          email: "snapsense@gmail.com",
          password:
            "$argon2i$v=19$m=4096,t=3,p=1$bffGZWLe2wI51JKnpl4Zeg$4ujZUcJWP6g2AM60zQ+v2JmgwG8i5aeN1yrUcU2UJUw",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("SuperAdmins");
  },
};
