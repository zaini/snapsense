import SubmissionCard from "./SubmissionsView/SubmissionCards/SubmissionCard";
import { Box } from "@chakra-ui/react";
import { AuthContext } from "../context/auth";
import { useContext } from "react";

const ShowSubmission = ({ submission }) => {
  const { user } = useContext(AuthContext);

  return (
    <Box>
      {user.accountType === "PATIENT" ? (
        <SubmissionCard data={submission} vertical={true} />
      ) : (
        <SubmissionCard
          testID="submissionCardContainer"
          data={submission}
          vertical={true}
          redirect={`/my/patients/show/${submission.Patient.id}`}
        />
      )}
    </Box>
  );
};

export default ShowSubmission;
