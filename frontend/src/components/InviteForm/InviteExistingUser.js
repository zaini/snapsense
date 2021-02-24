import { useContext } from "react";
import { Box, Button, Center } from "@chakra-ui/react";
import { AuthContext } from "../../context/auth";
import { useHistory } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";

const InvitePatientExists = ({ invitation }) => {
  const history = useHistory();
  const { user, logout } = useContext(AuthContext);

  if (
    user &&
    user.accountType === "PATIENT" &&
    user.email === invitation.newAcccountEmail
  ) {
    return (
      <Box p="7" borderWidth="1px" borderRadius="lg">
        <h1>
          You've been invited by {invitation.inviterEmail} to join their clinic.
          You already have an account so you will be added to this clinician's
          patients list if you accept.
        </h1>
        <br />
        <Box
          container
          justify="center"
          direction="column"
          alignItems="center"
          textAlign="center"
        >
          <Button mt={4} mr={4} colorScheme="blue" type="submit">
            Accept Invite
          </Button>
          <Button mt={4} colorScheme="red" type="submit">
            Decline Invite
          </Button>
        </Box>
      </Box>
    );
  } else {
    if (user) {
      logout();
    }
    return <LoginPage />;
  }
};

export default InvitePatientExists;
