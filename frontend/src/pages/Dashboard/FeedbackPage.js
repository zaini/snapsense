import Feedback from '../../components/Feedback/Feedback';
import { SimpleGrid } from "@chakra-ui/react";

const SubmissionPage = () => {
  return (
    <SimpleGrid spacing={2} w={"100%"}>
      <Feedback />
    </SimpleGrid>
  );
};

export default SubmissionPage;
