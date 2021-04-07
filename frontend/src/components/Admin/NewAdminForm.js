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
    update(proxy, result) {
      // Write to cache
      const data = proxy.readQuery({
        query: GET_ADMINS,
      });
      data.getAdmins = [result.data.createAdmin, ...data.getAdmins];
      proxy.writeQuery({
        query: GET_ADMINS,
        data: {
          getAdmins: [result.data.createAdmin, ...data.getAdmins],
        },
      });
    },
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
              Admin successfully created!
            </Alert>
          </div>
        )}
        <FormControl id="fname" isRequired mb={4}>
          <FormLabel>First name</FormLabel>
          <Input
            data-testid="adminNameInput"
            placeholder="First Name"
            name="fname"
            ref={register}
          />
        </FormControl>
        <FormControl id="lname" isRequired mb={4}>
          <FormLabel>Last name</FormLabel>
          <Input
            data-testid="adminLNameInput"
            placeholder="Last Name"
            name="lname"
            ref={register}
          />
        </FormControl>
        <FormControl id="email" name="email" isRequired mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            data-testid="adminEmailInput"
            type="email"
            name="email"
            placeholder="Email"
            ref={register}
          />
        </FormControl>
        <FormControl id="password" name="password" isRequired mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            data-testid="adminPasswordInput"
            type="password"
            name="password"
            placeholder="Password"
            ref={register}
          />
        </FormControl>
        <Center>
          <Button
            data-testid="submitButton"
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

  return markup;
};

export default NewAdminForm;

export const CREATE_ADMIN = gql`
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

export const GET_ADMINS = gql`
  query getAdmins {
    getAdmins {
      id
      fname
      lname
      email
      Hospital {
        name
      }
    }
  }
`;
