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

const NewRequestForm = ({ dateIn, testName, patient, periodic }) => {
  const { register, handleSubmit, control, getValues } = useForm();

  // Mutation hook with loading and error attributes
  const [createRequest, { loading, error, data }] = useMutation(
    CREATE_REQUEST,
    {
      onError(_) {}, // Error is handled below
    }
  );

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
      <Container
        data-testid="formSubmitInnerLoader"
        p="7"
        borderRadius="lg"
        mt="20"
      >
        <Center>
          <Spinner size="xl" />
        </Center>
      </Container>
    );
  } else if (error) {
    // Display the error on error
    markup = (
      <Container
        data-testid="formSubmitInnerError"
        p="7"
        borderRadius="lg"
        mt="20"
      >
        <Error
          errors={[
            {
              message:
                (error.graphQLErrors && error.graphQLErrors[0].message) ||
                error.message,
            },
          ]}
        />
      </Container>
    );
  } else {
    // Display the form
    markup = (
      <form onSubmit={handleSubmit(onSubmit)}>
        {data && (
          <div data-testid="formSubmitInnerSuccess">
            <Alert
              status="success"
              borderRadius="50px"
              mb={4}
              textAlign="center"
            >
              <AlertIcon />
              Request has been sent to {patient.fname}
            </Alert>
          </div>
        )}
        <RequestTypeSelector patient={patient} register={register} />
        <RequestDatePicker dateIn={dateIn} control={control} />

        <PeriodicSelector
          show={periodic}
          patient={patient}
          register={register}
        />
        <Center>
          <Button
            data-testid="formSubmit"
            type="submit"
            mt={4}
            colorScheme="blue"
          >
            Submit
          </Button>
        </Center>
      </form>
    );
  }

  return <div data-testid={testName}>{markup}</div>;
};

export default NewRequestForm;

// Graphql mutation
export const CREATE_REQUEST = gql`
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
