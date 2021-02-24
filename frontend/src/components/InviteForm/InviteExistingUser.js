import { useContext } from "react";
import { Box, Button, Center } from "@chakra-ui/react";
import { AuthContext } from "../../context/auth";
import { useHistory } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import LoginFormWrapper from "../LoginFormWrapper";

const InvitePatientExists = ({ invitation }) => {
  const history = useHistory();
  const { user, logout } = useContext(AuthContext);

  const [addRelation, { loading }] = useMutation(ADD_PATIENT_TO_DOCTOR, {
    onCompleted(data) {
      history.push("/");
    },
    variables: {
      patient_email: invitation.newAccountEmail,
      doctor_email: invitation.inviterEmail,
    },
  });

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
            type="submit"
            onClick={() => history.push("/")}
          >
            Decline Invite
          </Button>
        </Box>
      </Box>
    );
  } else {
    if (user) {
      logout();
    }
    return <LoginFormWrapper />;
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
