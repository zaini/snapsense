import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

import Error from "../Error";
import CopyLink from "../CopyLink";

// TODO move this to env
const URL_PREFIX = "http://localhost:3000";

// TODO add validation for email before submitting
const CreateInviteForm = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    errors,
    setError,
    formState,
    clearErrors,
  } = useForm();

  const [inviteLink, setInviteLink] = useState("");

  const [inviteUser, { loading }] = useMutation(INVITE_USER, {
    update(_, { data: { inviteUser: invitationToken } }) {
      setInviteLink(invitationToken);
      history.push("/login");
    },
    onError(err) {
      setError("graphql", {
        type: "manual",
        message: err.graphQLErrors[0].message,
      });
    },
  });

  const onSubmit = async ({ email, repeat_email }) => {
    clearErrors();
    if (email === repeat_email) {
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
      {inviteLink ? (
        <CopyLink link={URL_PREFIX + "/invite/" + inviteLink} />
      ) : (
        ""
      )}
    </Box>
  );
};

export default CreateInviteForm;

const INVITE_USER = gql`
  mutation invite_user($email: String!) {
    inviteUser(email: $email)
  }
`;
