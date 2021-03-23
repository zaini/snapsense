import SubmissionCard from "./SubmissionsView/SubmissionCards/SubmissionCard";
import { Box, Center, Heading } from "@chakra-ui/react";
import { AuthContext } from "../context/auth";
import { useContext } from "react";

const ShowSubmission = ({ submission }) => {
  const { user } = useContext(AuthContext);

  return (
    <Box>
      <Center>
        <Heading>View Submission</Heading>
        <br />
      </Center>

      {user.accountType === "PATIENT" ? (
        <SubmissionCard data={submission} vertical={true} />
      ) : (
        <SubmissionCard
          data={submission}
          vertical={true}
          redirect={`/my/patients/show/${submission.Patient.id}`}
        />
      )}
    </Box>
  );
};

export default ShowSubmission;
