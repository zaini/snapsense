const { UserInputError } = require("apollo-server");

const { Feedback } = require("../../models/index.js");
const {
  getAuthenticatedSuperAdmin,
} = require("./utils/superadminAuthorisation");

module.exports = {
  Query: {
    getFeedback: async (_, __, context) => {
      const superAdmin = await getAuthenticatedSuperAdmin(context);

      const feedback = await Feedback.findAll();
      return feedback;
    },
    getSpecificFeedback: async (_, { feedback_id }, context) => {
      const superAdmin = await getAuthenticatedSuperAdmin(context);

      const feedback = await Feedback.findByPk(feedback_id);
      if (!feedback) {
        throw new UserInputError("Feedback does not exist!");
      }
      return feedback;
    },
  },
  Mutation: {
    createFeedback: async (_, { stars, extra }) => {
      const feedback = await new Feedback({ stars, extra }).save();
      return feedback;
    },
  },
};
