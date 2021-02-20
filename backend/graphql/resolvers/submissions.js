const { Submission } = require("../../models/index.js");

module.exports = {
  Query: {
    getSubmissions: async () => {
      try {
        const submissions = await Submission.findAll();
        return submissions;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {},
};
