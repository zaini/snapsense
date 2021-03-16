const handleFileUpload = require("../../utils/filestreamUploader");

module.exports = {
  Mutation: {
    singleUploadStream: async (parent,{ file }) => {
      console.log(file);
      const response = await handleFileUpload(file);
      console.log(response);
      return response;
    },
  },
  Query: {},
};
