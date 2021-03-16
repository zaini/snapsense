import React from "react";
import { gql, useMutation } from "@apollo/client";

const ImageUpload = ({ imagesFromImageUpload }) => {
  const [fileUpload] = useMutation(UPLOAD_FILE_STREAM);

  function onChange({
    target: {
      validity,
      files: [file],
    },
  }) {
    if (validity.valid) fileUpload({ variables: { file } });
  }

  return <input type="file" required onChange={onChange} />;
};

export default ImageUpload;

const UPLOAD_FILE_STREAM = gql`
  mutation SingleUploadStream($file: Upload!) {
    singleUploadStream(file: $file) {
      Location
      Key
      ETag
    }
  }
`;
