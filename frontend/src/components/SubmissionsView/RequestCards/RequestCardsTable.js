import { Container, Text } from "@chakra-ui/layout";
import React from "react";
import {
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
} from "@chakra-ui/react";
import RequestCard from "./RequestCard";

const RequestCardsTable = ({ data }) => {
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
            No fulfilled and unreviewed requests
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            Your patients have no new submissions which you have requested and
            have not yet reviewed
          </AlertDescription>
        </Alert>
      </Container>
    );
  } else {
    markup = (
      <>
        {data.map((e, i) => {
          return <RequestCard key={i} data={e} />;
        })}
      </>
    );
  }

  return markup;
};

export default RequestCardsTable;
