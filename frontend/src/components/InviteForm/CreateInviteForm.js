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
  Center,
} from "@chakra-ui/react";

import Error from "../utils/Error";
import CopyLink from "../utils/CopyLink";

const URL_PREFIX =
  process.env.REACT_APP_FRONTEND_URL_PREFIX || "http://localhost:3000";

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

  const [inviteUser, { loading }] = useMutation(INVITE_USER, {
    onCompleted({ inviteUser: invitationToken }) {
      setInvitationToken(invitationToken);
    },
    onError(err) {
      setError("graphql", {
        type: "manual",
        message: err.graphQLErrors[0].message,
      });
      setInvitationToken("");
    },
  });

  const onSubmit = ({ email, repeat_email }) => {
    clearErrors();
    if (email === repeat_email) {
      // probably have to await this
      inviteUser({ variables: { email: email } });
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="email" isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input name="email" placeholder="Email" ref={register} />
        </FormControl>
        <br />
        <FormControl id="repeat_email" isRequired>
          <FormLabel htmlFor="repeat_email">Repeat Email</FormLabel>
          <Input
            name="repeat_email"
            placeholder="Repeat email"
            ref={register}
          />
        </FormControl>
        <br />
        <Center>
          <Button
            mt={4}
            colorScheme="blue"
            type="submit"
            isLoading={formState.isSubmitting}
          >
            Send Invite
          </Button>
        </Center>
      </form>
      {invitationToken ? (
        <CopyLink link={URL_PREFIX + "/invite/" + invitationToken} />
      ) : (
        ""
      )}
    </Box>
  );
};

export default CreateInviteForm;

const INVITE_USER = gql`
  mutation inviteUser($email: String!) {
    inviteUser(email: $email)
  }
`;
