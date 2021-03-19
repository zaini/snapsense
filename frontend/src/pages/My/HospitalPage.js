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

import CopyLink from "../../components/utils/CopyLink";

const HospitalPage = (props) => {
  const location = useParams();

  const {
    loading,
    data: { getSpecificHospital: hospital } = {},
    error,
  } = useQuery(GET_HOSPITAL, {
    variables: { hospital_id: location.hospital_id },
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
    markup = (
      <Container>
        <Center>
          <Heading>{hospital.name}</Heading>
        </Center>
        <br />
        <hr />
        <br />
        <FormControl id="id">
          <FormLabel>ID</FormLabel>
          <Input value={hospital.id} isReadOnly />
        </FormControl>
        <br />
        <FormControl id="name">
          <FormLabel>Hospital name</FormLabel>
          <Input value={hospital.name} isReadOnly />
        </FormControl>
        <br />
        <FormControl id="email">
          <FormLabel>Contact Email</FormLabel>
          <CopyLink link={hospital.contact_email} />
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

export default HospitalPage;

const GET_HOSPITAL = gql`
  query getSpecificHospital($hospital_id: ID!) {
    getSpecificHospital(hospital_id: $hospital_id) {
      id
      name
      contact_email
    }
  }
`;
