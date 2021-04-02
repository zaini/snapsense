import { useContext, useEffect } from "react";
import { Box, Button, Center, Heading } from "@chakra-ui/react";
import { AuthContext } from "../../context/auth";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import LoginFormWrapper from "../Login/LoginFormWrapper";

const InvitePatientExists = ({ invitation }) => {
  const history = useHistory();
  const { user, logout } = useContext(AuthContext);

  const [addRelation] = useMutation(ADD_PATIENT_TO_DOCTOR, {
    onCompleted(data) {
      alert("You have accepted this invitation.");
      history.push("/");
    },
    variables: {
      patient_email: invitation.newAccountEmail,
      doctor_email: invitation.inviterEmail,
    },
  });

  useEffect(() => {
    if (
      user &&
      !(
        user.accountType === "PATIENT" &&
        user.email === invitation.newAccountEmail
      )
    ) {
      logout();
    }
  }, []);

  if (
    user &&
    user.accountType === "PATIENT" &&
    user.email === invitation.newAccountEmail
  ) {
    return (
      <Box p="7" borderWidth="1px" borderRadius="lg">
        <h1>
          You've been invited by {invitation.inviterEmail} to join their clinic.
          You already have an account so you will be added to this clinician's
          patients list.
        </h1>
        <br />
        <Box
          container
          justify="center"
          direction="column"
          alignItems="center"
          textAlign="center"
        >
          <Button
            mt={4}
            mr={4}
            colorScheme="blue"
            onClick={() => addRelation()}
          >
            Accept
          </Button>
          <Button
            mt={4}
            colorScheme="red"
            onClick={() => {
              alert(
                "You have declined this invitation. You can come back to this link to accept it before it expires."
              );
              history.push("/");
            }}
          >
            Decline Invite
          </Button>
        </Box>
      </Box>
    );
  } else {
    return (
      <>
        <Center>
          <Heading>Login to View Invite</Heading>
        </Center>
        <LoginFormWrapper />
      </>
    );
  }
};

export default InvitePatientExists;

const ADD_PATIENT_TO_DOCTOR = gql`
  mutation addPatientToDoctor($patient_email: String!, $doctor_email: String!) {
    addPatientToDoctor(
      patient_email: $patient_email
      doctor_email: $doctor_email
    )
  }
`;
