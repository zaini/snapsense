"use strict";

// Password for all users in the seeds files are "Password123"
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Doctors",
      [
        {
          id: 1,
          fname: "Doctor",
          lname: "One",
          email: "doctor1@nhs.net",
          password: "$argon2i$v=19$m=4096,t=3,p=1$bffGZWLe2wI51JKnpl4Zeg$4ujZUcJWP6g2AM60zQ+v2JmgwG8i5aeN1yrUcU2UJUw",
          hospital_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          fname: "Doctor",
          lname: "Two",
          email: "doctor2@nhs.net",
          password: "$argon2i$v=19$m=4096,t=3,p=1$bffGZWLe2wI51JKnpl4Zeg$4ujZUcJWP6g2AM60zQ+v2JmgwG8i5aeN1yrUcU2UJUw",
          hospital_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Doctors");
  },
};
