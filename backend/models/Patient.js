// Example Patient model from database to be used in the resolvers
// Potentially using https://sequelize.org/

// example:

module.exports = (sequelize, Sequelize) => {
  const Patient = sequelize.define("Patient", {
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
  });

  return Patient;
};
