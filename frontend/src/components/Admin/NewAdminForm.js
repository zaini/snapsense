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

const NewAdminForm = ({ hospital }) => {
  const { register, handleSubmit } = useForm();

  const [createAdmin, { loading, error, data }] = useMutation(CREATE_ADMIN, {
    onError(_) {}, // Error is handled below
  });

  const onSubmit = ({ fname, lname, email, password }) => {
    // When the form is submitted, send the request
    createAdmin({
      variables: {
        fname,
        lname,
        email,
        password,
        hospital_id: hospital.id,
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
            Admin successfully created!
          </Alert>
        )}
        <FormControl id="fname" isRequired mb={4}>
          <FormLabel>First name</FormLabel>
          <Input placeholder="First Name" name="fname" ref={register} />
        </FormControl>
        <FormControl id="lname" isRequired mb={4}>
          <FormLabel>First name</FormLabel>
          <Input placeholder="Last Name" name="lname" ref={register} />
        </FormControl>
        <FormControl id="email" name="email" isRequired mb={4}>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" placeholder="Email" ref={register} />
        </FormControl>
        <FormControl id="password" name="password" isRequired mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            ref={register}
          />
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

export default NewAdminForm;

const CREATE_ADMIN = gql`
  mutation createAdmin(
    $fname: String!
    $lname: String!
    $email: String!
    $password: String!
    $hospital_id: ID!
  ) {
    createAdmin(
      fname: $fname
      lname: $lname
      email: $email
      password: $password
      hospital_id: $hospital_id
    ) {
      fname
      email
    }
  }
`;