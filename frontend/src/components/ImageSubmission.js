import { useState } from "react";
import { Center, Image } from "@chakra-ui/react"

// import imageData from "./file.json";
// will need to import image data

const ImageSubmission = () => {
  return (
    <Center w="100px">
        
        <Image 
        boxSize= "auto" 
        src="https://bit.ly/dan-abramov" 
        alt="Dan Abramov" />

        
    </Center>
  );
};

export default ImageSubmission;

