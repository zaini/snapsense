import React from "react";
import { useParams } from "react-router-dom";
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
  Stack,
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
        <Stack spacing={4}>
          <Center>
            <Heading>{feedback.name}</Heading>
          </Center>
          <FormControl id="id">
            <FormLabel>ID</FormLabel>
            <Input
              data-testid="feedbackIdHolder"
              value={feedback.id}
              isReadOnly
            />
          </FormControl>
          <FormControl id="stars">
            <FormLabel>Number of Stars</FormLabel>
            <Input
              data-testid="feedbackStarsHolder"
              value={
                feedback.stars === 0
                  ? "No stars 😢"
                  : "⭐".repeat(feedback.stars)
              }
              isReadOnly
            />
          </FormControl>
          <FormControl id="info">
            <FormLabel>Extra Information</FormLabel>
            <Textarea
              data-testid="feedbackExtraHolder"
              fontWeight="bold"
              value={
                feedback.extra === null
                  ? "No extra information was provided"
                  : feedback.extra
              }
              isReadOnly
            />
          </FormControl>
          <hr />
        </Stack>
      </Container>
    );
  }

  return markup;
};

export default ViewFeedback;

export const GET_SPECIFIC_FEEDBACK = gql`
  query getSpecificFeedback($feedback_id: ID!) {
    getSpecificFeedback(feedback_id: $feedback_id) {
      id
      stars
      extra
    }
  }
`;
