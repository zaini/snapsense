const { ApolloServer } = require("apollo-server");

const typeDefs = require("./graphql/typeDefs/typeDefs");
const resolvers = require("./graphql/resolvers");
const port = process.env.PORT || 5000;

require("dotenv").config();

const DATABASE_CONNECTION_URL = process.env.DATABASE_CONNECTION;
const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_SCHEMA = process.env.DATABASE_SCHEMA;

const { Sequelize, Model, DataTypes } = require("sequelize");
const patient_model = require("./models/Patient.js");

// MySQL and Sequelize Connection
const sequelize = new Sequelize(
  DATABASE_SCHEMA,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  {
    host: DATABASE_CONNECTION_URL,
    dialect: "mysql",
    define: { timestamps: false },
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

// Set up models
// TODO move this to another folder
const Patient = patient_model(sequelize);

// GraphQL Apollo Connection
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
