const { AuthenticationError } = require("apollo-server");

const { Feedback, SuperAdmin } = require("../../models/index.js");
const isAuth = require("../../utils/isAuth.js");

const getAuthenticatedSuperAdmin = async (context) => {
  // Get the user based on the context
  const user = isAuth(context);

  // Make sure user is a super admin
  if (user.accountType !== "SUPERADMIN") {
    throw new AuthenticationError("Invalid user account type!");
  }

  // Make sure the super admin is 'real' (i.e. in the db)
  const superAdmin = await SuperAdmin.findByPk(user.id);
  if (!superAdmin) {
    throw new AuthenticationError("Invalid user!");
  }

  return superAdmin;
};

module.exports = {
  Query: {
    getFeedback: async (_, __, context) => {
      const superAdmin = await getAuthenticatedSuperAdmin(context);

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
