import { useState, useEffect } from "react";
import { Button, VStack, Text, Box, HStack, Center } from "@chakra-ui/react";
import ModalImage from "react-modal-image";

const ImageSlideshow = () => {
  const images = [
    "https://i.imgur.com/EpQofxh.png",
    "https://i.imgur.com/EsbdsaJ.png",
    "https://i.imgur.com/lGqTIfq.png",
  ];
  const [index, setIndex] = useState(0);
  const [imageComponents, setImageComponents] = useState([]);

  useEffect(() => {
    let temp = [];
    images.forEach((e, i) => {
      let component = (
        <ModalImage
          key={i}
          small={e}
          large={e}
          alt="submission"
          showRotate={true}
        />
      );

      temp.push(component);
    });
    setImageComponents(temp);
  }, []);

  return (
    <VStack>
      <Box w="150px" h="150px" overflow="hidden" objectFit="scale-down">
        <Center>{imageComponents[index]}</Center>
      </Box>
      <HStack>
        <Button isDisabled={index === 0} onClick={() => setIndex(index - 1)}>
          Prev
        </Button>
        <Button
          isDisabled={index === images.length - 1}
          onClick={() => setIndex(index + 1)}
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
