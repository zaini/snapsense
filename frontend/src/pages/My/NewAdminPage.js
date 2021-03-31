import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  Alert,
  AlertIcon,
  Center,
  Container,
  Heading,
  Spinner,
  Stack,
} from "@chakra-ui/react";

import NewAdminForm from "../../components/Admin/NewAdminForm";

const NewAdminPage = () => {
  const params = useParams();

  const {
    loading,
    data: { getSpecificHospital: hospital } = {},
    error,
  } = useQuery(GET_HOSPITAL, {
    variables: { hospital_id: params.hospital_id },
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
    markup = <NewAdminForm hospital={hospital} />;
  }

  return (
    <Container>
      <Stack spacing={4}>
        <Heading textAlign="center">Create an Admin</Heading>
        <hr />
        {markup}
      </Stack>
    </Container>
  );
};

export default NewAdminPage;

export const GET_HOSPITAL = gql`
  query getSpecificHospital($hospital_id: ID!) {
    getSpecificHospital(hospital_id: $hospital_id) {
      id
      name
      contact_email
    }
  }
`;
