const { Feedback } = require("../../models/index");

const seed = async () => {
  await Feedback.create({
    id: 1,
    stars: 5,
    extra: "I love SnapSense so much!",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await Feedback.create({
    id: 2,
    stars: 5,
    extra: "My foot doesn't hurt anymore",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await Feedback.create({
    id: 3,
    stars: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await Feedback.create({
    id: 4,
    stars: 4,
    extra: "They have a very nice website!!!",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

module.exports = seed;
