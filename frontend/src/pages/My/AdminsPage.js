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
  Text,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

import Table from "../../components/utils/Table";

// Show all the hospitals (for the admin)
const HospitalsPage = () => {
  const { loading, data: { getAdmins: admins } = {}, error } = useQuery(
    GET_ADMINS
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
    console.log(admins);
    markup = <Table data={admins} cols={cols} />;
  }

  return (
    <>
      <Center>
        <Heading>Admins</Heading>
      </Center>
      <br />
      <hr />
      <br />
      {markup}
    </>
  );
};

export default HospitalsPage;

const GET_ADMINS = gql`
  query getAdmins {
    getAdmins {
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

const cols = [
  {
    field: "id",
    type: "number",
    headerName: "ID",
    flex: 0.2,
  },
  {
    field: "fname",
    headerName: "First Name",
    flex: 0.5,
  },
  {
    field: "lname",
    headerName: "Last Name",
    flex: 0.5,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 0.5,
  },
  {
    field: "hospital_name",
    headerName: "Hospital Name",
    flex: 0.5,
    renderCell: ({ row }) => {
      let hospital = row.Hospital.name;
      return <Text>{hospital}</Text>;
    },
  },
  {
    field: "",
    headerName: "View Admin",
    sortable: false,
    disableClickEventBubbling: true,
    renderCell: ({ row }) => {
      let id = row.id;
      return (
        <Link to={`/my/admins/show/${id}`}>
          <Button leftIcon={<ViewIcon />} colorScheme="blue">
            View
          </Button>
        </Link>
      );
    },
    flex: 0.7,
  },
];