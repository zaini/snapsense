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
    data: { getSpecificAdmin: admin } = {},
    error,
  } = useQuery(GET_ADMIN, {
    variables: { admin_id: location.admin_id },
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
          <Heading>{admin.fname}'s Profile</Heading>
        </Center>
        <br />
        <hr />
        <br />
        <FormControl id="id">
          <FormLabel>ID</FormLabel>
          <Input value={admin.id} isReadOnly />
        </FormControl>
        <br />
        <FormControl id="fname">
          <FormLabel>First name</FormLabel>
          <Input value={admin.fname} isReadOnly />
        </FormControl>
        <br />
        <FormControl id="lname">
          <FormLabel>Last name</FormLabel>
          <Input value={admin.lname} isReadOnly />
        </FormControl>
        <br />
        <FormControl id="hospital">
          <FormLabel>Hospital</FormLabel>
          <Input value={admin.Hospital.name} isReadOnly />
        </FormControl>
        <br />
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <CopyLink link={admin.email} />
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

const GET_ADMIN = gql`
  query getSpecificAdmin($admin_id: ID!) {
    getSpecificAdmin(admin_id: $admin_id) {
      id
      fname
      lname
      email
      Hospital {
        name
      }
    }
  }
`;
