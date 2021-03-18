const isAuth = require("../../utils/isAuth");

const hospitalResolvers = require("./hospitals");
const adminResolvers = require("./admins");
const doctorResolvers = require("./doctors");
const patientResolvers = require("./patients");
const submissionResolvers = require("./submissions");
const requestResolvers = require("./request");
const imageResolvers = require("./images");
const feedbackResolvers = require("./feedback");
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
    ...imageResolvers.Mutation,
    ...authorisation.Mutation,
    ...inviteTokenResolvers.Mutation,
    ...requestResolvers.Mutation,
    ...userResolvers.Mutation,
    ...feedbackResolvers.Mutation,
  },
  Query: {
    ...hospitalResolvers.Query,
    ...adminResolvers.Query,
    ...doctorResolvers.Query,
    ...patientResolvers.Query,
    ...submissionResolvers.Query,
    ...imageResolvers.Query,
    ...inviteTokenResolvers.Query,
    ...requestResolvers.Query,
    ...userResolvers.Query,
    ...feedbackResolvers.Query,
    isLoggedIn: async (_, __, { req, payload }) => {
      // This is an example query. Will be deleted.
      // user_data will store the payload, which is basically the data that's in the token
      let user_data = { id: "", accountType: "" };
      try {
        user_data = isAuth(req, payload);
      } catch (error) {
        throw new Error(error);
      }

      return `it works! your id is ${user_data.id} and your account type is ${user_data.accountType}`;
    },
  },
};
