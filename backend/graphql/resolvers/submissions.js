const { Submission } = require("../../models/index.js");

module.exports = {
  Query: {
    async getSubmissions() {
      try {
        const submissions = await Submission.findAll();
        return submissions;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    
  },
};
