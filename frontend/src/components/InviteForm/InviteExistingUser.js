import { useContext, useEffect, useState, useRef } from "react";
import { Box, Button, Center, Heading } from "@chakra-ui/react";
import { AuthContext } from "../../context/auth";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import LoginFormWrapper from "../Login/LoginFormWrapper";
import Alert from "../utils/Alert";

const InvitePatientExists = ({ invitation }) => {
  const history = useHistory();
  const { user, logout } = useContext(AuthContext);

  const [alertMessage, setAlertMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
    history.push("/");
  };
  const cancelRef = useRef();

  const [addRelation] = useMutation(ADD_PATIENT_TO_DOCTOR, {
    onCompleted() {
      setAlertMessage("You have accepted this invitation.");
      setIsOpen(true);
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

  let markup;

  if (
    user &&
    user.accountType === "PATIENT" &&
    user.email === invitation.newAccountEmail
  ) {
    markup = (
      <Box
        data-testid="InvitePatientExistingForm"
        p="7"
        borderWidth="1px"
        borderRadius="lg"
      >
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
            data-testid="btnAccept"
            mt={4}
            mr={4}
            colorScheme="blue"
            onClick={() => addRelation()}
          >
            Accept
          </Button>
          <Button
            data-testid="btnDecline"
            mt={4}
            colorScheme="red"
            onClick={() => {
              console.log("test");
              setAlertMessage(
                "You have declined this invitation. You can come back to this link to accept it before it expires."
              );
              setIsOpen(true);
            }}
          >
            Decline Invite
          </Button>
        </Box>
      </Box>
    );
  } else {
    markup = (
      <>
        <Center>
          <Heading>Login to View Invite</Heading>
        </Center>
        <LoginFormWrapper />
      </>
    );
  }

  return (
    <>
      {markup}
      <Alert
        isOpen={isOpen}
        cancelRef={cancelRef}
        onClose={onClose}
        alertHeader="Invitation"
        alertMessage={alertMessage}
      />
    </>
  );
};

export default InvitePatientExists;

export const ADD_PATIENT_TO_DOCTOR = gql`
  mutation addPatientToDoctor($patient_email: String!, $doctor_email: String!) {
    addPatientToDoctor(
      patient_email: $patient_email
      doctor_email: $doctor_email
    )
  }
`;
