import React from "react";
import { Container, Heading } from "@chakra-ui/react";

import ViewFeedback from "../../components/Feedback/ViewFeedback";

const ViewFeedbackPage = () => {
  return (
    <Container data-testid="view-feedback-page">
      <Heading textAlign="center">View Feedback</Heading>
      <br />
      <hr />
      <br />
      <div data-testid="feedbackDetailContainer">
        <ViewFeedback />
      </div>
    </Container>
  );
};

export default ViewFeedbackPage;
