const { Question } = require("../../models/index");

const seed = async () => {
  await Question.create({
    id: 1,
    text: "In the past 7 days, have you felt unwell?",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await Question.create({
    id: 2,
    text:
      "In the past 7 days, have you had a fever (temperature higher than 36C)?",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await Question.create({
    id: 3,
    text: "In the past 7 days, have you seen redness around your ulcer?",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await Question.create({
    id: 4,
    text: "In the past 7 days, have you seen any puss around your ulcer?",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await Question.create({
    id: 5,
    text: "In the past 7 days, has your ulcer been hotter to touch than usual?",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await Question.create({
    id: 6,
    text:
      "In the past 7 days, has one foot been hotter to touch than the other?",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await Question.create({
    id: 7,
    text:
      "In the past 7 days, have you noticed any unusual smells from the wound?",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await Question.create({
    id: 8,
    text: "Please add any other notes for your clinician (optional):",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

module.exports = seed;
