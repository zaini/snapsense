const { gql } = require("apollo-server");

module.exports = gql`
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Mutation {
    singleUpload(file: Upload!): File!
    singleUploadStream(file: Upload!): File!
  }

  type Query {
    helloWorld: String!
  }
`;
