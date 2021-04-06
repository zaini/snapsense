import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
} from "@chakra-ui/react";
import Error from "../utils/Error";
import Alert from "../utils/Alert";

const InviteNewUser = ({ invitation }) => {
  const { register, handleSubmit, errors, setError, formState } = useForm();
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
    history.push("/login");
  };
  const cancelRef = useRef();

  const [registerUser] = useMutation(REGISTER_USER, {
    onCompleted(res) {
      setIsOpen(true);
    },
    onError(err) {
      setError("graphql", {
        type: "manual",
        message:
          (err.graphQLErrors && err.graphQLErrors[0].message) || err.message,
      });
    },
  });

  const onSubmit = ({ first_name, last_name, password, repeat_password }) => {
    if (password === repeat_password) {
      registerUser({
        variables: {
          fname: first_name,
          lname: last_name,
          password,
          passwordConfirmation: repeat_password,
          invitationToken: invitation.invitationToken,
        },
      });
    } else {
      setError("password", {
        type: "manual",
        message: "Password must be identical.",
      });
    }
  };

  return (
    <Box
      data-testid="InvitePatientNewForm"
      p="7"
      borderWidth="1px"
      borderRadius="lg"
    >
      <h1>
        You've been invited by {invitation.inviterEmail} to join their clinic.
        They just need the following information to create an account.
      </h1>

      <br />

      <Error errors={errors} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="first_name" isRequired>
          <FormLabel htmlFor="first_name">First name</FormLabel>
          <Input
            data-testid="fnameForm"
            placeholder="First name"
            name="first_name"
            ref={register}
          />
        </FormControl>
        <br />
        <FormControl id="last_name" isRequired>
          <FormLabel htmlFor="last_name">Last name</FormLabel>
          <Input
            data-testid="lnameForm"
            placeholder="Last name"
            name="last_name"
            ref={register}
          />
        </FormControl>
        <br />
        <FormControl id="password" isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            data-testid="passwordForm"
            type="password"
            placeholder="Password"
            name="password"
            ref={register}
          />
        </FormControl>
        <br />
        <FormControl id="repeat_password" isRequired>
          <FormLabel htmlFor="repeat_password">Repeat Password</FormLabel>
          <Input
            data-testid="repPasswordForm"
            type="password"
            placeholder="Repeat password"
            name="repeat_password"
            ref={register}
          />
        </FormControl>
        <Center>
          <Button
            data-testid="submitForm"
            mt={4}
            colorScheme="blue"
            type="submit"
            isLoading={formState.isSubmitting}
          >
            Accept Invite
          </Button>
        </Center>
      </form>

      <Alert
        isOpen={isOpen}
        cancelRef={cancelRef}
        onClose={onClose}
        alertHeader="Invitation"
        alertMessage="You have created an account and accepted this invitation."
      />
    </Box>
  );
};

export default InviteNewUser;

export const REGISTER_USER = gql`
  mutation register(
    $fname: String!
    $lname: String!
    $password: String!
    $passwordConfirmation: String!
    $invitationToken: String!
  ) {
    register(
      fname: $fname
      lname: $lname
      password: $password
      passwordConfirmation: $passwordConfirmation
      invitationToken: $invitationToken
    )
  }
`;
