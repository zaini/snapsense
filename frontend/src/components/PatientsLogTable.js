import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Box } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom"

// Component which takes the data and returns a table for patient logs
const PatientsLogTable = ({ data }) => {
  const [cols] = useState([
    { field: "id", headerName: "ID", width: 80 },
    { field: "firstName", headerName: "First name", width: 160 },
    { field: "lastName", headerName: "Last Name", width: 160 },
    { field: "Action",
      headerName: "Action",
      width: 100,
      renderCell: function () {
        //TODO: add correct route
      return (<Button value={data} variant="contained" color="secondary"><Link to ='/' >View</Link></Button>);
    }}
  ]);
  
  return (
    <Box style={{ height: 600, width: '80%' }}>
      <DataGrid rows={data} columns={cols} autoPageSize />
    </Box>
  )
};

export default PatientsLogTable;
