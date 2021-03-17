"use strict";

// Password for all users in the seeds files are "Password123"
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Patients",
      [
        {
          id: 1,
          fname: "Patient",
          lname: "One",
          email: "patient1@gmail.com",
          password: "$argon2i$v=19$m=4096,t=3,p=1$bffGZWLe2wI51JKnpl4Zeg$4ujZUcJWP6g2AM60zQ+v2JmgwG8i5aeN1yrUcU2UJUw",
          flag: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          fname: "Patient",
          lname: "Two",
          email: "patient2@gmail.com",
          password: "$argon2i$v=19$m=4096,t=3,p=1$bffGZWLe2wI51JKnpl4Zeg$4ujZUcJWP6g2AM60zQ+v2JmgwG8i5aeN1yrUcU2UJUw",
          flag: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Patients");
  },
};
