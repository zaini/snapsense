const { Image } = require("../../models/index");

const seed = async () => {
  await Image.create({
    id: 1,
    url:
      "https://snapsensebucket.s3.ap-south-1.amazonaws.com/f150d94e-25cb-4973-bf26-d987b5bde188.jpg",
    submission_id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await Image.create({
    id: 2,
    url:
      "https://snapsensebucket.s3.ap-south-1.amazonaws.com/f150d94e-25cb-4973-bf26-d987b5bde188.jpg",
    submission_id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

	await Image.create({
    id: 3,
    url:
      "https://snapsensebucket.s3.ap-south-1.amazonaws.com/f150d94e-25cb-4973-bf26-d987b5bde188.jpg",
    submission_id: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

module.exports = seed;
