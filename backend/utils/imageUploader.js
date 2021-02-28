// const path = require("path");
// const fs = require("fs");
// const { v4: uuidv4 } = require("uuid");
// require("dotenv").config();

// const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
// const s3 = new S3Client({ region: process.env.AWS_REGION });

// const uploadImage = (filepath) => {
//   const file = filepath;

//   const uploadParams = { Bucket: "snapsensebucket", ACL: "public-read" };

//   // Configure the file stream and obtain the upload parameters
//   var fileStream = fs.createReadStream(file);
//   fileStream.on("error", function (err) {
//     console.log("File Error", err);
//   });

//   uploadParams.Key = uuidv4();
//   uploadParams.Body = fileStream;

//   const command = new PutObjectCommand(uploadParams);

//   const res = s3
//     .send(command)
//     .then((data) => {
//       console.log("Success", data);
//       return data;
//     })
//     .catch((error) => {
//       console.log("Error", error);
//       return error;
//     });

//   return res;
// };

// module.exports = uploadImage;
