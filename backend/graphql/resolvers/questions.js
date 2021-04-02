const { Question } = require("../../models/index.js");
const isAuth = require("../../utils/isAuth.js");

module.exports = {
  Query: {
    getQuestionnaire: async (_, __, context) => {
      // Make sure user is authenticated, we don't care what type the user is, as long as they are a user.
      // User type doesn't matter because questionnaire is already public. The user authentication
      // is just a preventative measure.
      const user = isAuth(context);

      // Currently the questionnaire is just all the questions, so just return all questions
      const questions = await Question.findAll();

      return questions;
    },
  },
  Mutation: {},
};
