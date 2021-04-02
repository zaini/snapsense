const hospitalResolvers = require("./hospitals");
const adminResolvers = require("./admins");
const doctorResolvers = require("./doctors");
const patientResolvers = require("./patients");
const submissionResolvers = require("./submissions");
const requestResolvers = require("./request");
const feedbackResolvers = require("./feedback");
const questionResolvers = require("./questions");
const authorisation = require("./utils/authorisation");
const inviteTokenResolvers = require("./utils/inviteLinks");
const userResolvers = require("./utils/users");

module.exports = {
  Mutation: {
    ...hospitalResolvers.Mutation,
    ...adminResolvers.Mutation,
    ...doctorResolvers.Mutation,
    ...patientResolvers.Mutation,
    ...submissionResolvers.Mutation,
    ...authorisation.Mutation,
    ...inviteTokenResolvers.Mutation,
    ...requestResolvers.Mutation,
    ...userResolvers.Mutation,
    ...feedbackResolvers.Mutation,
    ...questionResolvers.Mutation,
  },
  Query: {
    ...hospitalResolvers.Query,
    ...adminResolvers.Query,
    ...doctorResolvers.Query,
    ...patientResolvers.Query,
    ...submissionResolvers.Query,
    ...inviteTokenResolvers.Query,
    ...requestResolvers.Query,
    ...userResolvers.Query,
    ...feedbackResolvers.Query,
    ...questionResolvers.Query,
  },
};
