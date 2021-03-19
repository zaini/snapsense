const { Image } = require("../../models/index");

const seed = async () => {
  await new Image({
    id: 1,
    url:
      "https://snapsensebucket.s3.ap-south-1.amazonaws.com/f150d94e-25cb-4973-bf26-d987b5bde188.jpg",
    submission_id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).save();

  await new Image({
    id: 2,
    url:
      "https://snapsensebucket.s3.ap-south-1.amazonaws.com/f150d94e-25cb-4973-bf26-d987b5bde188.jpg",
    submission_id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).save();
};

module.exports = seed;
