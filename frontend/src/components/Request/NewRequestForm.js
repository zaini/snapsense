import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import {
  Alert,
  AlertIcon,
  Button,
  Center,
  Container,
  Spinner,
} from "@chakra-ui/react";

import RequestTypeSelector from "./RequestTypeSelector";
import RequestDatePicker from "./RequestDatePicker";
import Error from "../utils/Error";
import PeriodicSelector from "./PeriodicSelector";

const NewRequestForm = ({ patient, periodic }) => {
  const { register, handleSubmit, control, getValues } = useForm();

  // Mutation hook with loading and error attributes
  const [createRequest, { loading, error, data }] = useMutation(CREATE_REQUEST);

  const onSubmit = ({
    requestType,
    submissionDate,
    requestInterval,
    requestFrequency,
  }) => {
    // When the form is submitted, send the request
    createRequest({
      variables: {
        patient_id: patient.id,
        request_type: parseInt(requestType),
        interval: parseInt(requestInterval),
        frequency: parseInt(requestFrequency),
        deadline: submissionDate.getTime().toString(),
      },
    });
  };

  let markup;

  if (loading) {
    // Display a spinner if loading
    markup = (
      <Container p="7" borderRadius="lg" mt="20">
        <Center>
          <Spinner size="xl" />
        </Center>
      </Container>
    );
  } else if (error) {
    // Display the error on error
    markup = (
      <Container p="7" borderRadius="lg" mt="20">
        <Error
          errors={[
            {
              message: error.graphQLErrors[0].message,
            },
          ]}
        />
      </Container>
    );
  } else {
    // Display the form
    markup = (
      <form onSubmit={handleSubmit(onSubmit)}>
        {data ? (
          <Alert status="success" borderRadius="50px" mb={4} textAlign="center">
            <AlertIcon />
            Request has been sent to {patient.fname}, they will be notified
            shortly.
          </Alert>
        ) : null}
        <RequestTypeSelector patient={patient} register={register} />
        <RequestDatePicker control={control} />
        <PeriodicSelector show={periodic} patient={patient} register={register} />
        <Center>
          <Button type="submit" mt={4} colorScheme="blue">
            Submit
          </Button>
        </Center>
      </form>
    );
  }

  return markup;
};

export default NewRequestForm;

// Graphql mutation
const CREATE_REQUEST = gql`
  mutation createRequest(
    $patient_id: ID!
    $request_type: Int!
    $deadline: String!
    $interval: Int!
    $frequency: Int!
  ) {
    createRequest(
      patient_id: $patient_id
      request_type: $request_type
      deadline: $deadline
      frequency: $frequency
      interval: $interval
    )
  }
`;
