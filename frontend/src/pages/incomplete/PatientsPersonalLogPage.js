import React, { useState } from "react";
import Table from "../../components/incomplete/Table";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Flex, Heading, Stack } from "@chakra-ui/react";

// Page which displays a table of uploads from the patient logged on
const PatientsPersonalLogPage = () => {
  const [patientName] = useState("Bob");

  const { loading, data, error } = useQuery(GET_SUBMISSIONS);
  if (loading) {
    //add spinner
    return <p>Loading</p>;
  } else if (error) {
    console.log(error);
    return <p>Error</p>;
  } else {
    const rows = data.getSubmissionsByPatient;

    const cols = [
      { field: "id", headerName: "ID", hide: true, width: 80 },
      { field: "fulfilled", headerName: "Date submitted", width: 150, type: 'date', sortable: true},
      // { field: "subType", headerName: "Type", width: 90}, WHERE IS TYPE IN DB?
      { field: "Action",
        headerName: "Action",
        width: 100,
        renderCell: function () {
        return (<Button value={rows} variant="contained" color="secondary"><Link to ='/' >View</Link></Button>);
      }}
    ];
    return (
      <Flex w={"100%"}>
        <Stack spacing={3} w={"100%"}>
          <Heading>Your history of submissions {patientName}</Heading>
          <Table data={rows} cols={cols} />
        </Stack>
      </Flex>
    );
  }
};

export default PatientsPersonalLogPage;

const GET_SUBMISSIONS = gql`
  query {
    getSubmissionsByPatient {
      id
      fulfilled
      //type
    }
  }
`;