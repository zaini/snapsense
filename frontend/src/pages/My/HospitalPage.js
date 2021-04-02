import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Container,
  Spinner,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";

import HospitalDetails from "../../components/Hospital/HospitalDetails";
import DeleteHospitalModal from "../../components/Hospital/DeleteHospitalModal";

const HospitalPage = (props) => {
  const location = useParams();

  const {
    loading,
    data: { getSpecificHospital: hospital } = {},
    error,
  } = useQuery(GET_HOSPITAL, {
    variables: { hospital_id: location.hospital_id },
  });

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

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
        <Stack spacing={4}>
          <HospitalDetails hospital={hospital} />
          <Center>
            <Button
              as={Link}
              to={`/my/hospitals/${hospital.id}/admins/new`}
              colorScheme="blue"
              mr={4}
            >
              Create Admin for this Hospital
            </Button>
            <Button onClick={onDeleteOpen} colorScheme="red">
              Delete Hospital
            </Button>
          </Center>
          <DeleteHospitalModal
            isOpen={isDeleteOpen}
            onClose={onDeleteClose}
            hospital={hospital}
          />
        </Stack>
      </Container>
    );
  }

  return <Box data-testid="hospital-page">{markup}</Box>;
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
