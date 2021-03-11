import React, { useState } from "react";
import Table from "../../components/incomplete/Table";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Alert, AlertIcon, Spinner } from "@chakra-ui/react";
import { Flex, Heading, Stack } from "@chakra-ui/react";

// Shows all the patients that belong to a doctor
const PatientsLogPage = () => {
  //add pull of thr doctor's name
  const [doctorName] = useState("DoctorName");

  let markup;

  const { loading, data, error } = useQuery(GET_PATIENTS);
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
    const rows = data.getPatientsForDoctor;

    const cols = [
      { field: "_id", hide: true },
      { field: "fname", headerName: "First name", width: 200 },
      { field: "lname", headerName: "Last Name", width: 200 },
      {
        field: "Action",
        headerName: "Action",
        width: 200,
        renderCell: function () {
          return (
            //ADD CORRECT ID
            (
              <Button value={rows} variant="contained" color="secondary">
                <Link to="/profile/">Account</Link>
              </Button>
            ),
            (
              <Button value={rows} variant="contained" color="secondary">
                <Link to="/submissions/">Submissions</Link>
              </Button>
            ),
            (
              <Button value={rows} variant="contained" color="secondary">
                <Link to="/">Request</Link>
              </Button>
            )
          );
        },
      },
      { field: "status", headerName: "Flag", width: 150 },
    ];
    markup = (
      <Flex w={"100%"}>
        <Stack spacing={3} w={"100%"}>
          <Heading>All Patients for {doctorName}</Heading>
          <Table data={rows} cols={cols} />
        </Stack>
      </Flex>
    );
  }
  return markup;
};

export default PatientsLogPage;

const GET_PATIENTS = gql`
  query {
    getPatientsByDoctor {
      id
      fname
      lname
    }
  }
`;
