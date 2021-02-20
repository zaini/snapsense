const { ApolloServer } = require("apollo-server-express");
const express = require("express");
require("dotenv").config();
const typeDefs = require("./graphql/typeDefs/typeDefs");
const resolvers = require("./graphql/resolvers");

const port = process.env.PORT || 5000;
const app = express();

// GraphQL Apollo Connection
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res, payload }) => ({ req, res, payload }),
});

apolloServer.applyMiddleware({ app });

app.listen(port, () => {
  console.log(`Server ready at http://localhost:${port}/`);
});
