const { gql } = require("apollo-server");

module.exports = gql`
  type Query {
    helloWorld: String!
  }
`;
