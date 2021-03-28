import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Spinner,
} from "@chakra-ui/react";
import { Container, Center } from "@chakra-ui/layout";
import SubmissionCard from "./SubmissionCard";

const SubmissionCardsTable = () => {
  const { loading, data, error } = useQuery(GET_SUBMISSIONS);

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
    let data_rows = data.getSubmissionsForReview;
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
          {data_rows.map((e, i) => {
            return <SubmissionCard key={e.id} data={e} />;
          })}
        </>
      );
    }
  }

  return markup;
};

export default SubmissionCardsTable;

const GET_SUBMISSIONS = gql`
  query getSubmissions {
    getSubmissionsForReview {
      id
      flag
      createdAt
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
      Patient {
        id
        fname
        lname
        email
        flag
      }
    }
  }
`;
