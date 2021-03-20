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
      <Container p="7" borderRadius="lg" mt="20">
        <Center>
          <Spinner size="xl" />
        </Center>
      </Container>
    );
  } else {
    markup = (
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <Container p="7" borderRadius="lg">
            <Error
              errors={[
                {
                  message: error.graphQLErrors[0].message,
                },
              ]}
            />
          </Container>
        )}
        {data && (
          <Alert status="success" borderRadius="50px" mb={4} textAlign="center">
            <AlertIcon />
            Hospital successfully created!
          </Alert>
        )}
        <FormControl id="name" isRequired mb={4}>
          <FormLabel>Hospital name</FormLabel>
          <Input placeholder="Name" name="name" ref={register} />
        </FormControl>
        <FormControl id="email" name="email" isRequired mb={4}>
          <FormLabel>Contact email</FormLabel>
          <Input type="email" name="email" placeholder="Email" ref={register} />
        </FormControl>
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

export default NewHospitalForm;

const CREATE_HOSPITAL = gql`
  mutation createHospital($name: String!, $contact_email: String!) {
    createHospital(name: $name, contact_email: $contact_email) {
      name
      contact_email
    }
  }
`;
