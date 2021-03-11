import React, { useState } from "react";
import { Container } from "@material-ui/core";
import Table from "../components/Table";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom"
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

// Page for showing the logs of all the patients of the logged in doctor
const PatientsLogPage = () => {
  // TODO move state to be fetched on component mount
  const [doctorName] = useState("Dr. Oz");

  const { loading, data, error } = useQuery(GET_PATIENTS)
  if (loading) {
    //add spinner
    return <p>Loading</p> 
  }
  else if (error) {
    console.log(error)
    return <p>Error</p>
  }
  else {
    console.log(data)
    const rows = data.getPatients

  const cols = [
    { field: "status", headerName: "Flag", width: 80 },
    { field: "fname", headerName: "First name", width: 160 },
    { field: "lname", headerName: "Last Name", width: 160 },
    { field: "Action",
      headerName: "Action",
      width: 100,
      renderCell: function () {
      return (<Button value={rows} variant="contained" color="secondary"><Link to ='/' >View</Link></Button>);
    }}
  ];

  return (
    <Container>
      <h1 style={{textAlign: "center", fontSize: "3vh", fontWeight: "bold" }}>Your history of uploads, {doctorName}</h1>
      <Table data={rows} cols={cols}/>
    </Container>
  );
  }

 };

export default PatientsLogPage;

const GET_PATIENTS = gql`
  query {
    getPatients {
      fname
      lname
    }
  }
  `