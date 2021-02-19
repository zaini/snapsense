const { ApolloServer } = require("apollo-server");
require("dotenv").config();
const typeDefs = require("./graphql/typeDefs/typeDefs");
const resolvers = require("./graphql/resolvers");

//////AWS//////
const path = require("path");
const fs = require("fs");
//////AWS//////
const port = process.env.PORT || 5000;


//////AWS//////
const { S3Client, PutObjectCommand  } = require("@aws-sdk/client-s3");
const s3 = new S3Client({ region: process.env.AWS_REGION });

const file = "toupload/aa.jpg";

const uploadParams = { Bucket: "snapsensebucket", ACL:'public-read' };
uploadParams.Key = path.basename(file);

const command = new PutObjectCommand(uploadParams);

// promise method.
s3
  .send(command)
  .then((data) => {
    console.log("Success", data);
  })
  .catch((error) => {
    console.log("Error", error);
  })
  .finally(() => {
    // finally.
  });

//////AWS//////

// GraphQL Apollo Connection
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
