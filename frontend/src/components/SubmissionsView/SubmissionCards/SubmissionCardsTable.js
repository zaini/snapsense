import { Container, Text } from "@chakra-ui/layout";
import {
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
} from "@chakra-ui/react";
import React from "react";
import SubmissionCard from "./SubmissionCard";

const SubmissionCardsTable = ({ data }) => {
  let markup;
  if (data.length === 0) {
    markup = (
      <Container>
        <Alert
          status="info"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            No unreviewed submissions to view
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            Your patients have no new submissions which you not yet reviewed
          </AlertDescription>
        </Alert>
      </Container>
    );
  } else {
    markup = (
      <>
        {data.map((e, i) => {
          return <SubmissionCard data={e} />;
        })}
      </>
    );
  }

  return markup;
};

export default SubmissionCardsTable;
