const { ApolloServer } = require("apollo-server");

const typeDefs = require("./graphql/typeDefs/typeDefs");
const resolvers = require("./graphql/resolvers");

const port = process.env.PORT || 5000;

// GraphQL Apollo Connection
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});


server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
