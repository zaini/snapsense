const imageResolvers = require("./images");

module.exports = {
  Mutation: {
    ...imageResolvers.Mutation,
  },

  Query: {
    helloWorld() {
      return "Hello World";
    },
  },
};
