import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  Alert,
  AlertIcon,
  Center,
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Textarea,
} from "@chakra-ui/react";

const ViewFeedback = (props) => {
  const params = useParams();

  const {
    loading,
    data: { getSpecificFeedback: feedback } = {},
    error,
  } = useQuery(GET_SPECIFIC_FEEDBACK, {
    variables: { feedback_id: params.feedback_id },
  });

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
    markup = (
      <Container>
        <Center>
          <Heading>{feedback.name}</Heading>
        </Center>
        <br />
        <hr />
        <br />
        <FormControl id="id">
          <FormLabel>ID</FormLabel>
          <Input value={feedback.id} isReadOnly />
        </FormControl>
        <br />
        <FormControl id="stars">
          <FormLabel>Number of Stars</FormLabel>
          <Input
            value={
              feedback.stars === 0 ? "No stars 😢" : "⭐".repeat(feedback.stars)
            }
            isReadOnly
          />
        </FormControl>
        <br />
        <FormControl id="info">
          <FormLabel>Extra Information</FormLabel>
          <Textarea
            fontWeight="bold"
            value={
              feedback.extra === null
                ? "No extra information was provided"
                : feedback.extra
            }
            isReadOnly
          />
        </FormControl>
        <br />
        <br />
        <hr />
        <br />
      </Container>
    );
  }

  return markup;
};

export default ViewFeedback;

const GET_SPECIFIC_FEEDBACK = gql`
  query getSpecificFeedback($feedback_id: ID!) {
    getSpecificFeedback(feedback_id: $feedback_id) {
      id
      stars
      extra
    }
  }
`;
