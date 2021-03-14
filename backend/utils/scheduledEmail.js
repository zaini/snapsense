const { ApolloError } = require("apollo-server-core");
const { ScheduledEmail } = require("../models/index");

const enqueueEmail = async (p) => {
  if (!p) {
    throw new ApolloError("Invalid email parameters", 400);
  }
  try {
    await ScheduledEmail.create(p);
  } catch (error) {
    // MySQL query could not run, throw internal server error
    console.log("Mail could not be sent due to ", error);
    throw new ApolloError("Internal MX Server Error", 502);
  }
};

module.exports = enqueueEmail;
