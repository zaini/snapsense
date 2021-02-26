import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

//component to show all the patients from a hospital the admin is from
const AllPatientsTable = ({ data }) => {
  const [cols] = useState([
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'firstName', headerName: 'Name', width: 150 },
    { field: 'lastName', headerName: 'Surname', width: 150 },
  ]);


  return (
    <Box height="73vh" width="100%">
      <DataGrid rows={data} columns={cols} autoPageSize />
    </Box>
  );
};

export default AllPatientsTable;