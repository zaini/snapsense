import React from "react";
import { useForm } from "react-hook-form";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
} from "@chakra-ui/react";
import Error from "../Error";

const InviteNewUser = ({ invitation }) => {
  const { register, handleSubmit, errors, setError, formState } = useForm();

  const [registerUser, { data, loading }] = useMutation(REGISTER_USER);

  const onSubmit = async ({
    first_name,
    last_name,
    password,
    repeat_password,
  }) => {
    console.log("submitting again");
    if (password === repeat_password) {
      registerUser({
        variables: {
          fname: first_name,
          lname: last_name,
          password,
          invitationToken: invitation.invitationToken,
        },
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      setError("password", {
        type: "manual",
        message: "Password must be identical.",
      });
    }
  };

  return (
    <Box p="7" borderWidth="1px" borderRadius="lg">
      <h1>
        You've been invited by {invitation.inviterEmail} to join their clinic.
        They just need the following information to create an account.
      </h1>

      <br />

      <Error errors={errors} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="first_name" isRequired>
          <FormLabel htmlFor="first_name">First name</FormLabel>
          <Input placeholder="First name" name="first_name" ref={register} />
        </FormControl>
        <br />
        <FormControl id="last_name" isRequired>
          <FormLabel htmlFor="last_name">Last name</FormLabel>
          <Input placeholder="Last name" name="last_name" ref={register} />
        </FormControl>
        <br />
        <FormControl id="password" isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            placeholder="Password"
            name="password"
            ref={register}
          />
        </FormControl>
        <br />
        <FormControl id="repeat_password" isRequired>
          <FormLabel htmlFor="repeat_email">Repeat Password</FormLabel>
          <Input
            type="password"
            placeholder="Repeat password"
            name="repeat_password"
            ref={register}
          />
        </FormControl>
        <Center>
          <Button
            mt={4}
            colorScheme="blue"
            type="submit"
            isLoading={formState.isSubmitting}
          >
            Accept Invite
          </Button>
        </Center>
      </form>
    </Box>
  );
};

export default InviteNewUser;

const REGISTER_USER = gql`
  mutation register(
    $fname: String!
    $lname: String!
    $password: String!
    $invitationToken: String!
  ) {
    register(
      fname: $fname
      lname: $lname
      password: $password
      invitationToken: $invitationToken
    )
  }
`;
