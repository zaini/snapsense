import React, { useState } from "react";
import { Container } from "@material-ui/core";
import Table from "../components/Table";

// Page for showing the logs of all the patients from the hospital the admin is from
const AllPatientsPage = () => {
  const [hospitalName] = useState("Guy's Hospital");

  const [rows] = useState([
    { id: 1, lastName: 'Snow', firstName: 'Jon'},
    { id: 2, lastName: 'Lannister', firstName: 'Cersei' },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime' },
    { id: 4, lastName: 'Stark', firstName: 'Arya' },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys' },
    { id: 6, lastName: 'Melisandre', firstName: null },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara' },
    { id: 8, lastName: 'Frances', firstName: 'Rossini' },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey' },
  ]);

  const cols = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'firstName', headerName: 'Name', width: 150, sortable: true},
    { field: 'lastName', headerName: 'Surname', width: 150, sortable: true },
  ];

    return (
      <Container>
        <h1 style={{textAlign: "center", fontSize: "3vh", fontWeight: "bold" }}> Patients from {hospitalName} </h1>
        <Table data={rows} cols={cols} />
      </Container>
    );
};

export default AllPatientsPage;