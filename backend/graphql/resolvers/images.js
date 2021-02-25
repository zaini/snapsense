const imageUploader = require("../../utils/filestreamUploader");

module.exports = {
  Mutation: {
    singleUploadStream: async (parent, { file }) => {
      const response = await imageUploader(file);
      console.log(response);
      return response;
    },
  },
  Query: {},
};
