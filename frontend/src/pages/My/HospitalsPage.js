import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  Button,
  Center,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

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
    <>
      <Center>
        <Heading>Hospitals</Heading>
      </Center>
      <br />
      <hr />
      <br />
      {markup}
    </>
  );
};

export default HospitalsPage;

const GET_HOSPITALS = gql`
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
    headerName: "View Hospital",
    sortable: false,
    disableClickEventBubbling: true,
    renderCell: ({ row }) => {
      let id = row.id;
      return (
        <Link to={`/my/hospitals/show/${id}`}>
          <Button leftIcon={<ViewIcon />} colorScheme="blue">
            View
          </Button>
        </Link>
      );
    },
    flex: 0.7,
  },
];
