const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const { ApolloError } = require("apollo-server");
require("dotenv").config({ path: "../../.env" });

const col = require("./loggingFunc");
const { Image } = require("../models/index");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3({ region: process.env.AWS_REGION });

// max upload size of 3 MB
const s3DefaultParams = {
  ACL: "public-read",
  Bucket: process.env.AWS_S3_BUCKET,
  Conditions: [
    ["content-length-range", 0, 3024000], // 1 Mb
    { acl: "public-read" },
  ],
};

// the actual upload happens here
const handleFileUpload = async (file) => {
  if (process.env.NODE_ENV && process.env.NODE_ENV === "test") return true;
  const { createReadStream, filename } = await file;
  const extension = filename.split(".").pop();
  const extensionsAllowed = [
    "png",
    "jpg",
    "jpeg",
    "gif",
    "tiff",
    "PNG",
    "JPG",
    "JPEG",
    "GIF",
    "TIFF",
  ];
  if (!extensionsAllowed.includes(extension)) {
    throw new ApolloError(
      "Invalid File Uploaded, only JPGs, JPEGs, PNGs and TIFFs are allowed",
      400
    );
  }

  let prefix = uuidv4();

  return new Promise((resolve, reject) => {
    s3.upload(
      {
        ...s3DefaultParams,
        Body: createReadStream(),
        Key: `${prefix}.${extension}`,
      },
      (err, data) => {
        if (err) {
          console.log("error uploading file");
          reject(err);
        } else {
          console.log("successfully uploaded file");
          resolve(data);
        }
      }
    );
  });
};
module.exports = handleFileUpload;
