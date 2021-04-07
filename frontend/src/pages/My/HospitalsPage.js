import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  Button,
  Center,
  Stack,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { AddIcon, ViewIcon } from "@chakra-ui/icons";

import Table from "../../components/utils/Table";

// Show all the hospitals (for the admin)
const HospitalsPage = () => {
  const { loading, data: { getHospitals: hospitals } = {}, error } = useQuery(
    GET_HOSPITALS
  );

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
    markup = <Table data={hospitals} cols={cols} />;
  }

  return (
    <Stack spacing={4} data-testid="hospitals-page">
      <Center>
        <Heading>Hospitals</Heading>
      </Center>
      <hr />
      {markup}
    </Stack>
  );
};

export default HospitalsPage;

export const GET_HOSPITALS = gql`
  query getHospitals {
    getHospitals {
      id
      name
      contact_email
    }
  }
`;

const cols = [
  {
    field: "id",
    type: "number",
    headerName: "ID",
    flex: 0.2,
  },
  {
    field: "name",
    headerName: "Hospital Name",
    flex: 0.5,
  },
  {
    field: "contact_email",
    headerName: "Contact Email",
    flex: 0.5,
  },
  {
    field: "",
    headerName: "Actions",
    sortable: false,
    disableClickEventBubbling: true,
    renderCell: ({ row }) => {
      let id = row.id;
      return (
        <Stack direction="row" spacing={4}>
          <Link data-testid="hospitalShowLink" to={`/my/hospitals/show/${id}`}>
            <Button
              data-testid="viewButton"
              leftIcon={<ViewIcon />}
              colorScheme="blue"
            >
              View Hospital
            </Button>
          </Link>
          <Link
            data-testid="newAdminLink"
            to={`/my/hospitals/${id}/admins/new`}
          >
            <Button
              data-testid="createAdminButton"
              leftIcon={<AddIcon />}
              colorScheme="blue"
            >
              Create Admin
            </Button>
          </Link>
        </Stack>
      );
    },
    flex: 0.7,
  },
];
