const handleFileUpload = require("../../utils/filestreamUploader");
const imageUploader = require("../../utils/filestreamUploader");
const { Image, Submission } = require("../../models/index.js");

module.exports = {
  Query: {
    getImages: async () => {
      try {
        const images = await Image.findAll();
        return images;
      } catch (error) {
        throw new Error(error);
      }
    },
    getImagesBySubmission: async (_, { submission_id: id }, __) => {
      const submission = await Submission.findByPk(id);
      const images = submission.getImages();
      return images || [];
    },
  },
  Mutation: {},
};
