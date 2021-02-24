import { useContext } from "react";
import { Box, Button, Center } from "@chakra-ui/react";
import { AuthContext } from "../../context/auth";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const InvitePatientExists = ({ invitation }) => {
  const history = useHistory();
  const { user } = useContext(AuthContext);

  const [addRelation, { loading }] = useMutation(ADD_PATIENT_TO_DOCTOR, {
    onCompleted(data) {
      console.log(data);
    },
    variables: {
      patient_email: invitation.newAccountEmail,
      doctor_email: invitation.inviterEmail,
    },
  });
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
        {user && user.accountType === "PATIENT" ? (
          <>
            <Button mt={4} mr={4} colorScheme="blue" type="submit">
              Accept Invite
            </Button>
            <Button mt={4} colorScheme="red" type="submit">
              Decline Invite
            </Button>
          </>
        ) : (
          <>
            {/*Wasn't sure how we'd allow them to login then accept the invitation, so I just accept here. Let me know if you think of a way*/}
            <p>Click here to accept this invitation.</p>
            <Button
              mt={4}
              mr={4}
              colorScheme="blue"
              onClick={() => {
                addRelation();
                //history.push("/login")
              }}
            >
              Accept
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
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
