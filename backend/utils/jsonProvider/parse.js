const { ApolloError } = require("apollo-server-core");

const stringToJSON = (p) => {
  try {
    const obj = JSON.parse(p);
    return obj;
  } catch (e) {
    throw new ApolloError("Invalid JSON Parse");
  }
};
module.exports = stringToJSON;
