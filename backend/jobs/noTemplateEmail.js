const os = require("os");
const pMap = require("p-map");
const { parentPort } = require("worker_threads");
const sendMail = require("../utils/mailSender");
// store boolean if the job is cancelled
let isCancelled = false;

// how many emails to send at once
const concurrency = os.cpus().length;

console.log("Concurrency: " + concurrency);
// example database results
const results = [
  {
    message: {
      to: "ayanahmad.ahay@gmail.com",
    },
    locals: {
      name: "Ayan1 Ahmad",
    },
  },
  {
    message: {
      to: "ayanahmad5701@gmail.com",
    },
    locals: {
      name: "Ayan2 Ahmad",
    },
  },
  {
    message: {
      to: "anonymous.code.anonymous@gmail.com",
    },
    locals: {
      name: "Ayan3 Ahmad",
    },
  },
];
console.log("Almost ready to send email");

async function mapper(result) {
  // return early if the job was already cancelled
  if (isCancelled) return;
  try {
    const response = await sendMail(result.message.to, "This is a test Email","This is the body","----");
    console.log("sent email");
    // here is where you would write to the database that it was sent
    return response;
  } catch (err) {
    // catch the error so if one email fails they all don't fail
    console.log(err);
  }
}

console.log("Declared Mapper Function");

// handle cancellation (this is a very simple example)
if (parentPort)
  parentPort.once("message", (message) => {
    //
    // TODO: once we can manipulate concurrency option to p-map
    // we could make it `Number.MAX_VALUE` here to speed cancellation up
    // <https://github.com/sindresorhus/p-map/issues/28>
    //
    if (message === "cancel") isCancelled = true;
  });

(async () => {
  // query database results for emails not sent
  // and iterate over them with concurrency
  await pMap(results, mapper, { concurrency });

  // signal to parent that the job is done
  if (parentPort) parentPort.postMessage("done");
  else process.exit(0);
})();
