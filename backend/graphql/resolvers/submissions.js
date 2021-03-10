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
  Mutation: {
    createSubmission: async (_, submission_details) => {
      const submission = new Submission({
        ...submission_details,
        createdAt: new Date(),
      });

      return { ...submission.save() };
    },
  },
};
