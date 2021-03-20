import SubmissionCard from "./SubmissionsView/SubmissionCards/SubmissionCard";
import { Box, Center, Heading } from "@chakra-ui/react";

const ShowSubmission = ({ submission }) => {
  return (
    <Box>
      <Center>
        <Heading>View Submission</Heading>
        <br />
      </Center>
      <SubmissionCard data={submission} vertical={true} />
    </Box>
  );
};

export default ShowSubmission;
