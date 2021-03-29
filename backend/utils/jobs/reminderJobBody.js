const os = require("os");
const pMap = require("p-map");
const { parentPort } = require("worker_threads");
const { Request } = require("../../models/index.js");
const { ApolloError } = require("apollo-server-core");
const reminderJobMapper = require("./reminderJobMapper.js");

const reminderJobBody = async (days) => {
  let isCancelled = false;

  const mapper = async (result) => {
    // Number of Days
    await reminderJobMapper(result, days, isCancelled);
  };

  const concurrency = os.cpus().length;

  // Fetch requests that are due in the next 7 days
  const requestsFetched = await Request.findAll({
    where: {
      fulfilled: null,
    },
  });

  // at least one submission in need of a reminder email
  if (requestsFetched.length > 0) {
    if (parentPort) {
      parentPort.once("message", (message) => {
        if (message === "cancel") isCancelled = true;
      });
    }

    // each Submission object is passed to mapper for concurrent execution
    await pMap(requestsFetched, mapper, { concurrency });
  } else {
    console.log("___________No Reminders to Send___________");
  }
};

module.exports = reminderJobBody;
