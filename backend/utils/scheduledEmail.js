const { ApolloError } = require("apollo-server-core");
const { ScheduledEmail } = require("../models/index");
const JSONToString = require("./jsonProvider/string");

// Process p-> Parameters for the Scheduled email and h-> HTML Template Content
const enqueueEmail = async (p, h) => {
  if (!p || !h) {
    throw new ApolloError("Invalid email parameters", 400);
  }

  const jsonHtmlContents = JSONToString(h);
  p.html = jsonHtmlContents;

  try {
    await ScheduledEmail.create(p);
  } catch (error) {
    // MySQL query could not run, throw internal server error
    console.log("Mail could not be sent due to ", error);
    throw new ApolloError("Internal MX Server Error", 502);
  }
};

module.exports = enqueueEmail;
