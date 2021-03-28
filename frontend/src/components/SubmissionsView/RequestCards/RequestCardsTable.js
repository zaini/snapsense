import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Container, Center } from "@chakra-ui/layout";
import {
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Spinner,
} from "@chakra-ui/react";
import RequestCard from "./RequestCard";

const RequestCardsTable = () => {
  const { loading, data, error } = useQuery(GET_REQUESTS);

  let markup;

  if (loading) {
    markup = (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  } else if (error) {
    markup = (
      <Alert status="error">
        <AlertIcon />
        {error.graphQLErrors[0].message}
      </Alert>
    );
  } else {
    let data_rows = data.getRequestsForReview;
    if (data_rows.length === 0) {
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
          {data_rows.map((e, i) => {
            return <RequestCard key={`${e.Submission.id}-${i}`} data={e} />;
          })}
        </>
      );
    }
  }

  return markup;
};

export default RequestCardsTable;

export const GET_REQUESTS = gql`
  query getRequests {
    getRequestsForReview {
      id
      type
      deadline
      fulfilled
      Submission {
        id
        Images {
          id
          url
        }
        Answers {
          id
          Question {
            id
            text
          }
          value
          extra
        }
        flag
        createdAt
      }
      Patient {
        id
        fname
        lname
        email
        flag
      }
      Doctor {
        id
        fname
        lname
        email
      }
    }
  }
`;
