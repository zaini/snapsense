import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Table from "../../components/incomplete/Table";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { Alert, AlertIcon, Spinner } from "@chakra-ui/react";
import { Flex, Heading, Stack } from "@chakra-ui/react";

// If admin: shows all doctors from the same hospital
// If patient: shows all doctors that you have
const AllDoctorsPage = () => {
  const [hospitalName] = useState("Guy's Hospital");

  const { loading, data, error } = useQuery(GET_DOCTORS);

  let markup;

  if (loading) {
    markup = <Spinner size="xl" />;
  } else if (error) {
    markup = (
      <Alert status="error">
        <AlertIcon />
        {error.graphQLErrors[0].message}
      </Alert>
    );
  } else {
    const rows = data.getDoctorsByHospital;

    const cols = [
      { field: "id", hide: true },
      { field: "fname", headerName: "First name", width: 200 },
      { field: "lname", headerName: "Last Name", width: 200 },
      { field: "email", headerName: "email", type: "email", width: 200 },
    ];
    markup = (
      <Flex w={"100%"}>
        <Stack spacing={3} w={"100%"}>
          <Heading>Doctor's for {hospitalName} </Heading>
          <Table data={rows} cols={cols} />
        </Stack>
      </Flex>
    );
  }
  return markup;
};

export default AllDoctorsPage;

const GET_DOCTORS = gql`
  query {
    getDoctorsByHospital {
      id
      fname
      lname
    }
  }
`;
