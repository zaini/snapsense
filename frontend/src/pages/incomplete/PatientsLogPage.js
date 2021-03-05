import React, { useState } from "react";
import { Container } from "@material-ui/core";
import Table from "../components/Table";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom"

// Page for showing the logs of all the patients of the logged in doctor
const PatientsLogPage = () => {
  // TODO move state to be fetched on component mount
  const [doctorName] = useState("Dr. Oz");

  const rows = [
    { id: 1, firstName: "Ali", lastName: "Z" },
    { id: 2, firstName: "Michael", lastName: "Brian" },
    { id: 3, firstName: "Sheq", lastName: "Bev" },
    { id: 4, firstName: "Walter", lastName: "White" },
    { id: 5, firstName: "Jesse", lastName: "Crackhead" },
    { id: 6, firstName: "Foot", lastName: "Man" },
    { id: 7, firstName: "Dia", lastName: "Beetus" },
    { id: 8, firstName: "Ali", lastName: "Baba" },
    { id: 9, firstName: "Hana", lastName: "Chokler" },
    { id: 10, firstName: "Michael", lastName: "Kolling" },
  ];

  const cols = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "firstName", headerName: "First name", width: 160 },
    { field: "lastName", headerName: "Last Name", width: 160 },
    { field: "Action",
      headerName: "Action",
      width: 100,
      renderCell: function () {
        //TODO: add correct route
      return (<Button value={rows} variant="contained" color="secondary"><Link to ='/' >View</Link></Button>);
    }}
  ];

  return (
    <Container>
      <h1 style={{textAlign: "center", fontSize: "3vh", fontWeight: "bold" }}>Your history of uploads, {doctorName}</h1>
      <Table data={rows} cols={cols}/>
    </Container>
  );
};

export default PatientsLogPage;
