const hospitalResolvers = require("./hospitals");
const adminResolvers = require("./admins");
const doctorResolvers = require("./doctors");
const patientResolvers = require("./patients");
const submissionResolvers = require("./submissions");
const imageResolvers = require("./images");

module.exports = {
  Mutation: {
    ...hospitalResolvers.Mutation,
    ...adminResolvers.Mutation,
    ...doctorResolvers.Mutation,
    ...patientResolvers.Mutation,
    ...submissionResolvers.Mutation,
    ...imageResolvers.Mutation,
  },

  Query: {
    ...hospitalResolvers.Query,
    ...adminResolvers.Query,
    ...doctorResolvers.Query,
    ...patientResolvers.Query,
    ...submissionResolvers.Query,
    ...imageResolvers.Query,
    helloWorld() {
      return "Hello World";
    },
  },
};
