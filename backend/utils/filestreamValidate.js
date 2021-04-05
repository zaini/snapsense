const { UserInputError } = require("apollo-server");
require("dotenv").config({ path: "../../.env" });

// the actual validation happens here
const validateUpload = async (file) => {
  console.log(file);
  const { filename } = await file;
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
    throw new UserInputError(
      "Invalid File Uploaded, only JPGs, JPEGs, PNGs and TIFFs are allowed"
    );
  }

  return true;
};
module.exports = validateUpload;
