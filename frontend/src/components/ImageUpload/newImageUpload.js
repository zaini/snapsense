import React from "react";
import ImageUploading from "react-images-uploading";

const ImageUpload = ({imagesFromImageUpload}) => {
  const [images, setImages] = React.useState([]);
  const maxNumber = 5;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    setImages(imageList);
    imagesFromImageUpload(imageList);
  };

  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey="data_url"
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <div className="upload__image-wrapper">
          <button
            style={
              isDragging
                ? {
                    padding: "10px",
                    marginRight: "10px",
                    backgroundColor: "#a1cdf0",
                    color: "#000a12",
                    borderRadius: "5px",
                  }
                : {
                    padding: "10px",
                    marginRight: "10px",
                    backgroundColor: "#42d7f5",
                    color: "#000a12",
                    borderRadius: "5px",
                  }
            }
            onClick={onImageUpload}
            {...dragProps}
          >
            Click or Drop here
          </button>
          &nbsp;
          <button
            style={{
              padding: "10px",
              marginRight: "10px",
              backgroundColor: "#990918",
              color: "#fff5f6",
              borderRadius: "5px",
            }}
            onClick={onImageRemoveAll}
          >
            Remove all images
          </button>
          {imageList.map((image, index) => (
            <div key={index} className="image-item">
              <img style={{margin:"10px"}} src={image.data_url} alt="" width="100" />
              <div className="image-item__btn-wrapper">
                <button
                  style={{
                    padding: "10px",
                    marginRight: "10px",
                    backgroundColor: "#e38c00",
                    color: "#fcfafa",
                    borderRadius: "5px",
                  }}
                  onClick={() => onImageUpdate(index)}
                >
                  Update
                </button>
                <button
                  style={{
                    padding: "10px",
                    marginRight: "10px",
                    backgroundColor: "#990918",
                    color: "#fcfafa",
                    borderRadius: "5px",
                  }}
                  onClick={() => onImageRemove(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </ImageUploading>
  );
};

export default ImageUpload;
