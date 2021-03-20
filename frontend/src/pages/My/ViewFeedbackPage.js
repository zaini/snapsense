import React from "react";
import { Container, Heading } from "@chakra-ui/react";

import ViewFeedback from "../../components/Feedback/ViewFeedback";

const ViewFeedbackPage = () => {
  return (
    <Container>
      <Heading>View Feedback</Heading>
      <br />
      <hr />
      <br />
      <ViewFeedback />
    </Container>
  );
};

export default ViewFeedbackPage;
