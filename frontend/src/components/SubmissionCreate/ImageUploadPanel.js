import React from "react";
import { Paper } from "@material-ui/core";
import { Heading } from "@chakra-ui/react";

import ImageUpload from "./ImageUpload";

const ImageUploadPanel = ({ classes, setImages }) => {
  return (
    <Paper className={classes.paper} data-testid="imageUpload">
      <Heading style={{ textAlign: "center" }}>Image Upload</Heading>
      <ImageUpload setImages={setImages} />
    </Paper>
  );
};

export default ImageUploadPanel;
