const imageUploader = require("../../utils/filestreamUploader");

module.exports = {
  Query:{
    getImages: async () => {
      try {
        const images = await Images.findAll();
        return images;
      } catch (error) {
        throw new Error(error);
      }
    },
    getImagesBySubmission: async (_, { submission_id: id }, __) => {
      const submission = await Submission.findByPk(id);
      const images = submission.getImages();
      return images || []
    }
  },
  Mutation: {
    singleUploadStream: async (parent, { file }) => {
      const response = await imageUploader(file);
      console.log(response);
      return response;
    },
  },
  Query: {},
};
