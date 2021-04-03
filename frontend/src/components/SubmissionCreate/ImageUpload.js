import React from "react";
import ImageUploader from "react-images-upload";
import { Box } from "@chakra-ui/react";

const ImageUpload = ({ setImages }) => {
  return (
    <Box w={"100%"}>
      <ImageUploader
        data-testid="imageUpload"
        className="ImageUpload"
        withIcon={true}
        withPreview={true}
        buttonText="Choose images to Upload"
        onChange={setImages}
        imgExtension={[".jpg", ".jpeg", ".gif", ".png", ".gif"]}
        maxFileSize={3024000}
      />
    </Box>
  );
};

export default ImageUpload;
