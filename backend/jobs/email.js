const os = require("os");
const pMap = require("p-map");
const { parentPort } = require("worker_threads");
const sendMail = require("../utils/mailSender");
const { ScheduledEmail } = require("../models/index.js");
const giveTemplate = require("../utils/emailTemplateProvider");

// status:
// 0 new
// 1 pending
// 2 error sending
// 3 sent

// Calling an immediately invoked function in order to enable async/await functionality
(async () => {
  let isCancelled = false;
  const concurrency = os.cpus().length;
  let sendingIds = [];

  // this is responsible for setting the status of an/various id(s) belonging to the scheduledEmails model
  async function emailStatusChanger(newStatus, id) {
    await ScheduledEmail.update(
      { status: newStatus },
      {
        where: {
          id: id,
        },
      }
    );
  }

  // each ScheduledEmail object retrived will be passed through this
  async function mapper(result) {
    // return early if the job was already cancelled
    if (isCancelled) return;
    try {

      // Retrieve HTML code by passing essential information to Template Provider
      const htmlContent = giveTemplate(result.template, result.html);

      // Send main using Nodemailer
      const response = await sendMail(
        result.to,
        result.subject,
        htmlContent,
        result.altbody
      );

      // If the email was succesfully sent, set the ID for this ScheduledEmail to 3
      await emailStatusChanger(3, result.id);

      return response;
    } catch (err) {

      // If the email was not succesfully sent, set the ID for this ScheduledEmail to 2
      await emailStatusChanger(2, result.id);
      console.log(err);
    }
  }

  // Fetch all scheduled emails that have not been processed yet, id=0
  const emailsFetched = await ScheduledEmail.findAll({
    where: { status: 0 },
    limit: 25,
  });

  // at least one scheduled email
  if (emailsFetched.length > 0) {
    emailsFetched.map((e, i) => {
      sendingIds.push(e.dataValues.id);
    });

    // set the status of all previously fetched emails to 1 , denotes currently being processed
    await emailStatusChanger(1, sendingIds);

    if (parentPort) {
      parentPort.once("message", (message) => {
        if (message === "cancel") isCancelled = true;
      });
    }

    // each ScheduledEmail object inside emailsFetched is passed to mapper with concurrent execution
    await pMap(emailsFetched, mapper, { concurrency });
  } else {
    console.log("___________No Emails___________");
  }

  // signal to parent that the job is done
  if (parentPort) parentPort.postMessage("done");
  else process.exit(0);
})();
