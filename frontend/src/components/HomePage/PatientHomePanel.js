import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { Alert, AlertIcon, Spinner, Box, Button, Text } from "@chakra-ui/react";
import { Center, Container, Stack } from "@chakra-ui/layout";

const PatientHomePanel = () => {
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
    let request_data = data.getRequestsAsPatient;

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
      >
        <Stack>
          <Text>You have {request_data.length} requests to fulfil.</Text>
          <Link to="/my/requests">
            <Button
              backgroundColor="blue.600"
              color="blue.50"
              _hover={{ bg: "blue.700" }}
            >
              View My Requests
            </Button>
          </Link>
        </Stack>
      </Box>
    );
  }

  return (
    <Container>
      <Center>
        <Link to="/my/submissions/new">
          <Button
            backgroundColor="blue.600"
            color="blue.50"
            _hover={{ bg: "blue.700" }}
          >
            Create New Submission Now
          </Button>
        </Link>
      </Center>

      <br />
      <Center>{markup}</Center>
    </Container>
  );
};

export default PatientHomePanel;

const GET_REQUESTS = gql`
  query getRequests {
    getRequestsAsPatient {
      id
    }
  }
`;
