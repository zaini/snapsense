import ImageUpload from "../../components/ImageUpload/twoImageUpload";
import Questionnaire from "../../components/Questionnaire/Questionnaire.js";
import { SimpleGrid, Flex, Stack, Button } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

// Create a new submission as a patient

const NewSubmissionPage = () => {
  const [images, setImages] = useState([]);
  const [answers, setAnswers] = useState({ questionnaire: {} });

  const [uploadSubmission, { loading, error, data }] = useMutation(
    UPLOAD_SUBMISSION
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
        <ImageUpload setImages={setImages} />
        <Questionnaire answers={answers} setAnswers={setAnswers} />
      </SimpleGrid>
      <Flex>
        <Button
          rightIcon={<CheckCircleIcon />}
          colorScheme="teal"
          variant="solid"
          onClick={() => {
            uploadSubmission({
              variables: {
                images,
                answers: JSON.stringify(answers),
              },
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

const UPLOAD_SUBMISSION = gql`
  mutation createSubmission($images: [Upload!], $answers: String!) {
    createSubmission(images: $images, answers: $answers)
  }
`;
