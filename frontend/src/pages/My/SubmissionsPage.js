import SubmissionsComponent from "../../components/SubmissionsView/SubmissionsComponent";
import { Heading, Center } from "@chakra-ui/react";

// For patients: shows all their submissions
// For doctor: shows the submissions of all their patients
const SubmissionsPage = () => {
  return (
    <>
      <Center>
        <Heading data-testid="submissions-header">Submissions</Heading>
      </Center>

      <br />
      <hr />
      <br />

      <SubmissionsComponent />
    </>
  );
};

export default SubmissionsPage;
