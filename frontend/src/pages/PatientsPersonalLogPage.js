import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Container, Box } from "@material-ui/core";
import PatientsPersonalLogTable from "../components/PatientsPersonalLogTable";

// Page which displays a table of uploads from the patient logged on
const PatientsPersonalLogPage = () => {
  // TODO: Use object from backend to obtain the value of name
  const [patientName] = useState("Bob");

  const [rows] = useState([
    { id: 1, date: "2020-02-14", subType: "Photo"},
    { id: 2, date: "2021-01-24", subType: "Photo"},
    { id: 3, date: "2021-01-27", subType: "Photo"},
    { id: 4, date: "2021-02-20", subType: "Photo"},
    
  ]);

  return (
    <Container>
      <h1>Your history of uploads, {patientName}</h1>
      <PatientsPersonalLogTable data={rows} />
    </Container>
  );
};

export default PatientsPersonalLogPage;