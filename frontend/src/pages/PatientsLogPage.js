import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Container, Box } from "@material-ui/core";
import PatientsLogTable from "../components/PatientsLogTable";

// Page for showing the logs of all the patients of the logged in doctor
const PatientsLogPage = () => {
  // TODO move state to be fetched on component mount
  const [doctorName] = useState("Dr. Oz");

  const [rows] = useState([
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
  ]);

  return (
    <Container>
      <h1 style={{textAlign: "center", fontSize: "3vh", fontWeight: "bold" }}>Patients Log for {doctorName}</h1>
      <PatientsLogTable data={rows} />
    </Container>
  );
};

export default PatientsLogPage;
