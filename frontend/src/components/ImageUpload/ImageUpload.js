import React from "react";
import ImageUploader from "react-images-upload";

import { Flex, Box } from "@chakra-ui/react";

// TODO change to functional component
class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });
  }

  render() {
    return (
      <Flex className="ImageUploader" style={{ justifyContent: "center" }}>
        <Box w={"100%"} p={"10px"}>
          <ImageUploader
            withIcon={true}
            withPreview={true}
            buttonText="Choose images to Upload"
            onChange={this.onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={3024000}
          />
        </Box>
      </Flex>
    );
  }
}

export default ImageUpload;
