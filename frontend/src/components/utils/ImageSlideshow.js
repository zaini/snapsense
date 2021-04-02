import { useState, useEffect } from "react";
import { Button, VStack, Text, Box, HStack, Center } from "@chakra-ui/react";
import ModalImage from "react-modal-image";

const ImageSlideshow = ({ images }) => {
  const [index, setIndex] = useState(0);
  const [imageComponents, setImageComponents] = useState([]);

  useEffect(() => {
    let temp = [];
    images.forEach(({ url }, i) => {
      let component = (
        <ModalImage
          key={i}
          small={url}
          large={url}
          alt="submission"
          showRotate={true}
        />
      );

      temp.push(component);
    });
    setImageComponents(temp);
  }, []);

  return (
    <VStack data-testid="ImageSlideshow">
      <Box w="220px" h="100%" overflow="hidden" objectFit="scale-down">
        <Center>{imageComponents[index]}</Center>
      </Box>
      <HStack>
        <Button
          data-testid="imagePrevBtn"
          isDisabled={index === 0}
          onClick={() => setIndex(index - 1)}
          colorScheme="blue"
        >
          Prev
        </Button>
        <Button
          data-testid="imageNextBtn"
          isDisabled={index === images.length - 1}
          onClick={() => setIndex(index + 1)}
          colorScheme="blue"
        >
          Next
        </Button>
      </HStack>
      <Text fontWeight="bold">
        {index + 1} / {images.length}
      </Text>
    </VStack>
  );
};

export default ImageSlideshow;
