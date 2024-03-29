import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { Alert, AlertIcon, Spinner, Box, Button, Text } from "@chakra-ui/react";
import { Center, Container, Stack } from "@chakra-ui/layout";

const DoctorHomePanel = () => {
  const { loading, data, error } = useQuery(GET_SUBMISSIONS);
  const {
    loading: requests_loading,
    data: requests_data,
    error: requests_error,
  } = useQuery(GET_REQUESTS);

  let markup;

  if (loading || requests_loading) {
    markup = (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  } else if (error || requests_error) {
    markup = (
      <Alert status="error">
        <AlertIcon />
        {error ? error.message : requests_error.message}
      </Alert>
    );
  } else {
    let submission_data = data.getSubmissionsForReview;
    let request_data = requests_data.getRequestsForReview;

    markup = (
      <Box
        w="100%"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        textAlign="center"
        p="15px"
        fontWeight="bold"
        backgroundColor="blue.100"
        data-testid="doctorHomeContainer"
      >
        <Stack>
          <Text data-testid="doctorHomeTextOne">
            You have {submission_data.length} submissions to review.
          </Text>
          <Text data-testid="doctorHomeTextTwo">
            You have {request_data.length} requests to review.
          </Text>
          <Link data-testid="reviewPatientLink" to="/my/submissions/review">
            <Button data-testid="reviewPatientsButton" colorScheme="blue">
              Review My Patients
            </Button>
          </Link>
        </Stack>
      </Box>
    );
  }

  return (
    <Container>
      <Center>{markup}</Center>
    </Container>
  );
};

export default DoctorHomePanel;

export const GET_SUBMISSIONS = gql`
  query getSubmissionsForReview {
    getSubmissionsForReview {
      id
    }
  }
`;

export const GET_REQUESTS = gql`
  query getRequestsForReview {
    getRequestsForReview {
      id
    }
  }
`;
