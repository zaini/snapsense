const { Feedback } = require("../../models/index.js");

module.exports = {
  Query: {
    getFeedback: async () => {
      const feedback = await Feedback.findAll();
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
