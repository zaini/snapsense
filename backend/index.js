const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const typeDefs = require("./graphql/typeDefs/typeDefs");
const resolvers = require("./graphql/resolvers");

const port = process.env.PORT || 5000;
const app = express();

// GraphQL Apollo Connection
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

// Allow requests only from the frontend
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

apolloServer.applyMiddleware({ app, cors: corsOptions });

module.exports = app;