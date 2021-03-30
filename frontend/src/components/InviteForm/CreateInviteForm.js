import React, { useState } from "react";
import { useForm } from "react-hook-form";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  Center,
} from "@chakra-ui/react";

import Error from "../utils/Error";
import CopyLink from "../utils/CopyLink";

const URL_PREFIX = process.env.REACT_APP_FRONTEND_URL_PREFIX;

const CreateInviteForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    setError,
    formState,
    clearErrors,
  } = useForm();

  const [invitationToken, setInvitationToken] = useState("");

  const [inviteUser, { data }] = useMutation(INVITE_USER, {
    onCompleted({ inviteUser: invitationToken }) {
      setInvitationToken(invitationToken);
    },
    onError(err) {
      const message =
        (err.graphQLErrors && err.graphQLErrors[0].message) || err.message;
      // We have to assign this to a field in the form for it to let us resubmit after an error
      setError("email", { type: "manual", message });
      setInvitationToken("");
    },
  });

  const onSubmit = async ({ email, repeat_email }) => {
    clearErrors();
    if (email === repeat_email) {
      await inviteUser({ variables: { email: email } });
    } else {
      setError("email", {
        type: "manual",
        message: "Emails must be identical.",
      });
    }
  };
  return (
    <Box p="7" borderWidth="1px" borderRadius="lg">
      <Error errors={errors} />
      {data && (
        <Alert status="success" borderRadius="50px" mb={4} textAlign="center">
          <AlertIcon />
          Your invite has been sent!
        </Alert>
      )}
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="email" isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            data-testid="inviteEmail"
            name="email"
            type="email"
            placeholder="Email"
            ref={register}
          />
        </FormControl>
        <br />
        <FormControl id="repeat_email" isRequired>
          <FormLabel htmlFor="repeat_email">Repeat Email</FormLabel>
          <Input
            data-testid="inviteEmailRepeat"
            name="repeat_email"
            type="email"
            placeholder="Repeat email"
            ref={register}
          />
        </FormControl>
        <br />
        <Center>
          <Button
            data-testid="inviteSubmit"
            mt={4}
            colorScheme="blue"
            type="submit"
            isLoading={formState.isSubmitting}
          >
            Send Invite
          </Button>
        </Center>
      </form>
      {invitationToken && (
        <>
          <br />
          <CopyLink link={`${URL_PREFIX}/invites/show/${invitationToken}`} />
        </>
      )}
    </Box>
  );
};

export default CreateInviteForm;

export const INVITE_USER = gql`
  mutation inviteUser($email: String!) {
    inviteUser(email: $email)
  }
`;
