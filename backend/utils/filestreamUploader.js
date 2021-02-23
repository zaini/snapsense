const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const col = require("./loggingFunc");

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

const prefix = uuidv4();

// the actual upload happens here
const handleFileUpload = async (file) => {
  const { createReadStream, filename } = await file;
  const extension = filename.split(".").pop();

  return new Promise((resolve, reject) => {
    s3.upload(
      {
        ...s3DefaultParams,
        Body: createReadStream(),
        Key: `${prefix}.${extension}`,
      },
      (err, data) => {
        if (err) {
          col("error uploading file");
          reject(err);
        } else {
          col("successfully uploaded file");
          resolve(data);
        }
      }
    );
  });
};
module.exports = handleFileUpload;
