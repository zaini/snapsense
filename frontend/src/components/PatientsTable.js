import React from "react";
import Table from "./incomplete/Table";
import { Container } from "@material-ui/core";

const PatientsTable = ({ hospitalName, rows, cols }) => {
  return (
    <Container>
      <h1 style={{ textAlign: "center", fontSize: "3vh", fontWeight: "bold" }}>
        Patients from {hospitalName}
      </h1>
      <Table data={rows} cols={cols} />
    </Container>
  );
};

export default PatientsTable;
