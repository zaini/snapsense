module.exports = {
  Mutation: {
    singleUpload: (parent, args) => {
      return args.file.then((file) => {
        const { createReadStream, filename, mimetype } = file;

        const fileStream = createReadStream();

        fileStream.pipe(fs.createWriteStream(`./uploadedFiles/${filename}`));

        return file;
      });
    },
    singleUploadStream: async (parent, args) => {
      const file = await args.file;
      const { createReadStream, filename, mimetype } = file;
      const fileStream = createReadStream();

      const uploadParams = {
        Bucket: "apollo-file-upload-test",
        Key: filename,
        Body: fileStream,
      };
      const result = await s3.upload(uploadParams).promise();

      console.log(result);

      return file;
    },
  },
};
