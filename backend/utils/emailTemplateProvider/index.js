const { ApolloError } = require("apollo-server");
const inviteTemplate = require("./invite");
const requestTemplate = require("./request");
const reminderTemplate = require("./reminder");
const hospitalTemplate = require("./hospital");

const giveTemplate = (t, p) => {
  let toRet = "";
  switch (t) {
    case "invite":
      toRet = inviteTemplate(p);
      break;

    case "request":
      toRet = requestTemplate(p);
      break;

    case "reminder":
      toRet = reminderTemplate(p);
      break;

    case "hospital":
      toRet = hospitalTemplate(p);
      break;

    default:
      throw new ApolloError("Invalid Email template selected", 400);
      break;
  }
  return toRet;
};

module.exports = giveTemplate;
