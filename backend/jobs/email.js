const os = require("os");
const pMap = require("p-map");
const { parentPort } = require("worker_threads");
const sendMail = require("../utils/mailSender");
const { ScheduledEmail } = require("../models/index.js");
const giveTemplate = require("../utils/emailTemplateProvider");

(async () => {
  let isCancelled = false;
  const concurrency = os.cpus().length;
  let sendingIds = [];

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

  async function mapper(result) {
    // return early if the job was already cancelled
    if (isCancelled) return;
    try {
      const htmlContent = giveTemplate(result.template,result.html); 
      // console.log(htmlContent);
      const response = await sendMail(
        result.to,
        result.subject,
        htmlContent,
        result.altbody
      );
      await emailStatusChanger(3, result.id);
      return response;
    } catch (err) {
      await emailStatusChanger(2, result.id);
      console.log(err);
    }
  }

  // status:
  // 0 new
  // 1 pending
  // 2 error sending
  // 3 sent

  const emailsFetched = await ScheduledEmail.findAll({
    where: { status: 0 },
    limit: 25,
  });

  if (emailsFetched.length > 0) {
    emailsFetched.map((e, i) => {
      sendingIds.push(e.dataValues.id);
    });
    await emailStatusChanger(1, sendingIds);

    if (parentPort) {
      parentPort.once("message", (message) => {
        if (message === "cancel") isCancelled = true;
      });
    }

    await pMap(emailsFetched, mapper, { concurrency });
  } else {
    console.log("___________No Emails___________");
  }

  // signal to parent that the job is done
  if (parentPort) parentPort.postMessage("done");
  else process.exit(0);


})();
