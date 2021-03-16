import ImageUpload from "../../components/ImageUpload/twoImageUpload";
import Questionnaire from "../../components/Questionnaire/Questionnaire.js";
import { SimpleGrid, Flex, Stack, Button } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

// Create a new submission as a patient

const NewSubmissionPage = () => {
  const [images, setImages] = useState([]);
  const [answers, setAnswers] = useState([]);

  const imagesFromImageUpload = (images) => {
    // the callback. Use a better name
    setImages(images);
  };

  const answersFromQuestionnaire = (answers) => {
    // the callback. Use a better name
    setAnswers(answers);
  };

  const [uploadImages, { loading, error, data }] = useMutation(
    UPLOAD_FILE_STREAM
  );

  return (
    <Stack>
      <SimpleGrid
        columns={[1, 1, 1, 1]}
        spacing={2}
        p="30"
        borderWidth="2em"
        borderRadius="lg"
        mt="30"
      >
        <ImageUpload imagesFromImageUpload={imagesFromImageUpload} />
        <Questionnaire answersFromQuestionnaire={answersFromQuestionnaire} />
      </SimpleGrid>
      <Flex>
        <Button
          rightIcon={<CheckCircleIcon />}
          colorScheme="teal"
          variant="solid"
          disabled={answers.length !== 8}
          onClick={() => {
            images.forEach((image, index)=>{
              uploadImages({
                variables: {
                  file: image,
                },
              });
            });
          }}
        >
          Submit
        </Button>
      </Flex>
    </Stack>
  );
};

export default NewSubmissionPage;

const UPLOAD_FILE_STREAM = gql`
  mutation SingleUploadStream($file: Upload!) {
    singleUploadStream(file: $file) {
      Location
    }
  }
`;
