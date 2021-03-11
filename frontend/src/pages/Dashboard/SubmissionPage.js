import ImageUpload from "../../components/ImageUpload/ImageUpload";
import Questionnaire from "../../components/Questionnaire/Questionnaire.js";
import { SimpleGrid } from "@chakra-ui/react";

const SubmissionPage = () => {
  return (
    <SimpleGrid columns={[1, 1, 1, 2]} spacing={2} w={"100%"}>
      <ImageUpload />
      <Questionnaire />
    </SimpleGrid>
  );
};

export default SubmissionPage;
