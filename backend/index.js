const { ApolloServer } = require("apollo-server");

const typeDefs = require("./graphql/typeDefs/typeDefs");
const resolvers = require("./graphql/resolvers");
const port = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

// TODO: Connect to database

server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
