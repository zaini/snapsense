import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import {
  Alert,
  AlertIcon,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  Container,
  Spinner,
} from "@chakra-ui/react";

import Error from "../utils/Error";

const NewHospitalForm = () => {
  const { register, handleSubmit } = useForm();

  const [createHospital, { loading, error, data }] = useMutation(
    CREATE_HOSPITAL,
    {
      update(proxy, result) {
        // Write to cache
        const data = proxy.readQuery({
          query: GET_HOSPITALS,
        });
        data.getHospitals = [result.data.createHospital, ...data.getHospitals];
        proxy.writeQuery({
          query: GET_HOSPITALS,
          data: {
            getHospitals: [result.data.createHospital, ...data.getHospitals],
          },
        });
      },
      onError(_) {}, // Error is handled below
    }
  );

  const onSubmit = ({ name, email }) => {
    // When the form is submitted, send the request
    createHospital({
      variables: {
        name,
        contact_email: email,
      },
    });
  };

  let markup;

  if (loading) {
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
  } else {
    markup = (
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <Container data-testid="formSubmitInnerError" p="7" borderRadius="lg">
            <Error
              errors={[
                {
                  message: error.message,
                },
              ]}
            />
          </Container>
        )}
        {data && (
          <div data-testid="formSubmitInnerSuccess">
            <Alert
              status="success"
              borderRadius="50px"
              mb={4}
              textAlign="center"
            >
              <AlertIcon />
              Hospital successfully created!
            </Alert>
          </div>
        )}
        <FormControl id="name" isRequired mb={4}>
          <FormLabel>Hospital name</FormLabel>
          <Input
            data-testid="hospitalNewFormName"
            placeholder="Name"
            name="name"
            ref={register}
          />
        </FormControl>
        <FormControl id="email" name="email" isRequired mb={4}>
          <FormLabel>Contact email</FormLabel>
          <Input
            data-testid="hospitalNewFormEmail"
            type="email"
            name="email"
            placeholder="Email"
            ref={register}
          />
        </FormControl>
        <Center>
          <Button
            type="submit"
            mt={4}
            colorScheme="blue"
            data-testid="submitButton"
          >
            Submit
          </Button>
        </Center>
      </form>
    );
  }

  return markup;
};

export default NewHospitalForm;

export const CREATE_HOSPITAL = gql`
  mutation createHospital($name: String!, $contact_email: String!) {
    createHospital(name: $name, contact_email: $contact_email) {
      name
      contact_email
    }
  }
`;

export const GET_HOSPITALS = gql`
  query getHospitals {
    getHospitals {
      id
      name
      contact_email
    }
  }
`;
