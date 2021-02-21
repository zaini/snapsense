import React from "react";
import { useForm } from "react-hook-form";
import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

const InviteForm = ({ invitation }) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  if (invitation.accountExists) {
    if (invitation.accountType === "PATIENT") {
      return (
        <Box p="7" borderWidth="1px" borderRadius="lg">
          <h1>
            You've been invited by {invitation.inviterEmail} to join their
            clinic. You already have an account, so would you like to be added
            to their clinic?
          </h1>
          <br />
          <Button mt={4} mr={4} colorScheme="blue" type="submit">
            Accept Invite
          </Button>
          <Button mt={4} colorScheme="red" type="submit">
            Decline Invite
          </Button>
        </Box>
      );
    } else if (invitation.accountType === "DOCTOR") {
      return (
        <Box p="7" borderWidth="1px" borderRadius="lg">
          <h1>
            You already have a SnapSense account and so cannot accept another
            request to join. You must delete you current account to join another
            clinic.
          </h1>
        </Box>
      );
    }
  }

  return (
    <Box p="7" borderWidth="1px" borderRadius="lg">
      <h1>
        You've been invited by {invitation.inviterEmail} to join their clinic.
        They just need the following information to create an account.
      </h1>

      <br />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="first_name" isRequired>
          <FormLabel>First name</FormLabel>
          <Input placeholder="First name" />
        </FormControl>
        <br />
        <FormControl id="last_name" isRequired>
          <FormLabel>Last name</FormLabel>
          <Input placeholder="Last name" />
        </FormControl>
        <br />
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="Password" />
        </FormControl>
        <br />
        <FormControl id="repeat_password" isRequired>
          <FormLabel>Repeat Password</FormLabel>
          <Input type="password" placeholder="Repeat password" />
        </FormControl>
        <Button mt={4} colorScheme="blue" type="submit">
          Accept Invite
        </Button>
      </form>
    </Box>
  );
};

export default InviteForm;
