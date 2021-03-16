import React, { useState } from "react";
import ImageUploader from "react-images-upload";
import { Flex, Box } from "@chakra-ui/react";

const ImageUpload = ({ setImages }) => {
  return (
    <Flex className="ImageUploader" style={{ justifyContent: "center" }}>
      <Box w={"100%"} p={"10px"}>
        <ImageUploader
          withIcon={true}
          withPreview={true}
          buttonText="Choose images to Upload"
          onChange={setImages}
          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
        />
      </Box>
    </Flex>
  );
};

export default ImageUpload;
