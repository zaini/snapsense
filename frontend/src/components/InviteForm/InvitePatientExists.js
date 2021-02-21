import React from "react";
import { Box, Button } from "@chakra-ui/react";

const InvitePatientExists = ({ invitation }) => {
  return (
    <Box p="7" borderWidth="1px" borderRadius="lg">
      <h1>
        You've been invited by {invitation.inviterEmail} to join their clinic.
        You already have an account, so would you like to be added to their
        clinic?
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
};

export default InvitePatientExists;
