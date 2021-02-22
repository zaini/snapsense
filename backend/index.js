const { ApolloServer } = require("apollo-server");
require("dotenv").config();
const typeDefs = require("./graphql/typeDefs/typeDefs");
const resolvers = require("./graphql/resolvers");
const imageUploader = require("./utils/imageUploader");
const mailSender = require("./utils/mailSender");

const port = process.env.PORT || 5000;

// imageUploader("./nasa.jpg");
//mailSender("ayanahmad.ahay@gmail.com","Fre ShavAcodo","FRESHHHHH!!!");
// GraphQL Apollo Connection
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
