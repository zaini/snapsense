import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  FormControl,
  FormLabel,
  Container,
  Input,
  Heading,
  Center,
  Alert,
  AlertIcon,
  Spinner,
} from "@chakra-ui/react";
import CopyLink from "./utils/CopyLink";

const PatientInfo = (props) => {
  const location = useParams();
  const { loading, data, error } = useQuery(GET_PATIENT_AS_DOCTOR, {
    variables: { patient_id: location.patient_id },
  });

  let markup;

  if (loading) {
    markup = (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  } else if (error) {
    markup = (
      <Alert status="error">
        <AlertIcon />
        {error.graphQLErrors[0].message}
      </Alert>
    );
  } else {
    let user = data.getPatientAsDoctor;
    markup = (
      <Container>
        <Center>
          <Heading>{user.fname}'s Profile</Heading>
        </Center>
        <br />
        <hr />
        <br />
        <FormControl id="first_name">
          <FormLabel>First name</FormLabel>
          <Input value={user.fname} isReadOnly />
        </FormControl>
        <br />
        <FormControl id="last_name">
          <FormLabel>Last name</FormLabel>
          <Input value={user.lname} isReadOnly />
        </FormControl>
        <br />
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <CopyLink link={user.email} />
        </FormControl>
        <br />
        <br />
        <hr />
        <br />
      </Container>
    );
  }

  return markup;
};

export default PatientInfo;

const GET_PATIENT_AS_DOCTOR = gql`
  query getPatientAsDoctor($patient_id: ID!) {
    getPatientAsDoctor(patient_id: $patient_id) {
      id
      fname
      lname
      email
    }
  }
`;
