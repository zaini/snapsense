import ImageUpload from "../../components/ImageUpload/ImageUpload";
import Questionnaire from "../../components/Questionnaire/Questionnaire.js";
import { SimpleGrid } from "@chakra-ui/react";

// Create a new submission as a patient
const NewSubmissionPage = () => {
  return (
    <SimpleGrid
      columns={[1, 1, 1, 1]}
      spacing={2}
      p="30"
      borderWidth="2em"
      borderRadius="lg"
      mt="30"
    >
      <ImageUpload />
      <Questionnaire />
    </SimpleGrid>
  );
};

export default NewSubmissionPage;
