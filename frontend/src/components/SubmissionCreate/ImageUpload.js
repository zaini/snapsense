import React, { useState } from "react";
import ImageUploader from "react-images-upload";
import { Box } from "@chakra-ui/react";

const ImageUpload = ({ setImages }) => {
  return (
    <Box w={"100%"}>
      <ImageUploader
        className="ImageUpload"
        withIcon={true}
        withPreview={true}
        buttonText="Choose images to Upload"
        onChange={setImages}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
      />
    </Box>
  );
};

export default ImageUpload;
