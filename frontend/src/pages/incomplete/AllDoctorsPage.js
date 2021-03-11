import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Table from "../../components/incomplete/Table";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Flex, Heading, Stack } from "@chakra-ui/react";

// Page for showing the logs of all the doctors from the hospital the admin is from

const AllDoctorsPage = () => {
  const [hospitalName] = useState("Guy's Hospital");

  const { loading, data, error } = useQuery(GET_DOCTORS); 
  if (loading) {
    //add spinner
    return <p>Loading</p>;
  } else if (error) {
    console.log(error);
    return <p>Error</p>;
  } else {
    const rows = data.getDoctorsByHospital;

    const cols = [
      { field: "_id", hide: true },
      { field: "fname", headerName: "First name", width: 200 },
      { field: "lname", headerName: "Last Name", width: 200 },
      {
        field: "Action",
        headerName: "Action",
        width: 200,
        renderCell: function () {
          return ( //ADD CORRECT ID
            <Button value={rows} variant="contained" color="secondary">
              <Link to="/profile/:id">Account</Link>
            </Button>
          );
        },
      },
    ];
    return ( //add name of the hospital into heading
      <Flex w={"100%"}>
        <Stack spacing={3} w={"100%"}> 
          <Heading>Doctor's for Hospital </Heading>
          <Table data={rows} cols={cols} />
        </Stack>
      </Flex>
    );
  }
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