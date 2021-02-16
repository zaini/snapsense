import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Box } from "@material-ui/core";

// Component which takes the data and returns a table for patient logs
const PatientsLogTable = ({ data }) => {
  const [cols] = useState([
    { field: "id", headerName: "ID", width: 80 },
    { field: "firstName", headerName: "First name", width: 160 },
    { field: "lastName", headerName: "Last Name", width: 160 },
    { field: "options", headerName: "Options", width: 160 },
  ]);
  return (
    <>
      <Box height="450px" width="50%">
        <DataGrid columns={cols} rows={data} pageSize={4} />
      </Box>
    </>
  );
};

export default PatientsLogTable;
