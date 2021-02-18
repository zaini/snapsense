const { Sequelize } = require("sequelize");
require("dotenv").config();

// MySQL and Sequelize Connection
const sequelize = new Sequelize(
  process.env.DATABASE_SCHEMA,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_CONNECTION,
    dialect: "mysql",
    define: { timestamps: false },
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Established connection to the database"))
  .catch((error) =>
    console.log("Error establishing connection to the database!", error)
  );

module.exports = sequelize;
