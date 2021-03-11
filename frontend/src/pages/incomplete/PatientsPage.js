import React, { useState } from "react";
import Table from "../../components/incomplete/Table";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Flex, Heading, Stack } from "@chakra-ui/react";

// Page for showing the logs of all the patients of the logged in doctor
const PatientsLogPage = () => {
  // TODO move state to be fetched on component mount
  const [doctorName] = useState("Dr. Oz");

  const { loading, data, error } = useQuery(GET_PATIENTS); //change to get patients for doctor?
  if (loading) {
    //add spinner
    return <p>Loading</p>;
  } else if (error) {
    console.log(error);
    return <p>Error</p>;
  } else {
    console.log(data);
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
            <Button value={rows} variant="contained" color="secondary">
              <Link to="/profile/:id">Account</Link>
            </Button>,
            <Button value={rows} variant="contained" color="secondary">
              <Link to="/submissions/:id">Submissions</Link>
            </Button>,
            <Button value={rows} variant="contained" color="secondary">
              <Link to="/">Request</Link>
            </Button>
          );
        },
      },
      { field: "status", headerName: "Flag", width: 150 },
    ];
    return (
      <Flex w={"100%"}>
        <Stack spacing={3} w={"100%"}>
          <Heading>All Patients</Heading>
          <Table data={rows} cols={cols} />
        </Stack>
      </Flex>
    );
  }
};

export default PatientsLogPage;

//change to get patients for doctor query?
const GET_PATIENTS = gql`
  query {
    getPatientsByDoctor {
      id
      fname
      lname
    }
  }
`;
