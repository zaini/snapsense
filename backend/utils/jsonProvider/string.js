const { ApolloError } = require("apollo-server-core");

const JSONToString = (p) => {
  try {
    const data = JSON.stringify(p);
    return data;
  } catch (e) {
    throw new ApolloError("Invalid JSON");
  }
};

module.exports = JSONToString;
