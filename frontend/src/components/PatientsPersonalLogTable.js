import React from "react";
import Table from "./incomplete/Table";
import { Container } from "@material-ui/core";

const PatientsPersonalLogTable = ({ patientName, rows, cols }) => {
  return (
    <Container>
      <h1 style={{ textAlign: "center", fontSize: "3vh", fontWeight: "bold" }}>
        Your history of uploads, {patientName}
      </h1>
      <Table data={rows} cols={cols} />
    </Container>
  );
};

export default PatientsPersonalLogTable;
