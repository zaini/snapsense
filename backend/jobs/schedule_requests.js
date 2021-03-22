const os = require("os");
const pMap = require("p-map");
const { parentPort } = require("worker_threads");
const { Op } = require("sequelize");
const moment = require("moment");
const { ApolloError } = require("apollo-server");

const { ScheduledRequest } = require("../models/index.js");
const createRequest = require("../utils/createRequest.js");

(async () => {
  let isCancelled = false;

  const mapper = async (scheduled) => {
    // return early if the job was already cancelled
    if (isCancelled) return;
    try {
      // For each Scheduled Request
      const request = await scheduled.getRequest();

      // Date Time manipulation
      const delta = scheduled.dataValues.interval * 24 * 60;

      // New StartTime for the next request to be sent
      const nextRequest = moment(request.dataValues.deadline).add(
        delta,
        "minutes"
      );

      await createRequest(request.dataValues, nextRequest);
      scheduled.startDate = nextRequest;
      scheduled.frequency = scheduled.dataValues.frequency - 1;
      await scheduled.save();
    } catch (err) {
      throw new ApolloError(err, 500);
    }
  };

  const concurrency = os.cpus().length;

  // Fetch requests that are due in the next 7 days
  const requestsFetched = await ScheduledRequest.findAll({
    where: {
      startDate: {
        [Op.eq]: new Date(),
      },
      frequency: {
        [Op.gt]: 0,
      },
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

    if (parentPort) parentPort.postMessage("done");
    else process.exit(0);
  } else {
    console.log("___________No Requests to Schedule___________");
  }

  // signal to parent that the job is done
  if (parentPort) parentPort.postMessage("done");
  else process.exit(0);
})();
