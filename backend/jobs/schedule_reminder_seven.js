const { parentPort } = require("worker_threads");
const reminderJobBody = require("../utils/jobs/reminderJobBody.js");

(async () => {
  // Number of Days
  await reminderJobBody(7);
  // signal to parent that the job is done
  if (parentPort) parentPort.postMessage("done");
  else process.exit(0);
})();
