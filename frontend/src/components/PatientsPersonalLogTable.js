import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Box } from "@material-ui/core";
import Button from '@material-ui/core/Button';

// Component which shows the patients history of uploads
//TODO: Update the link to the page which displays the details of the upload
const PatientsPersonalLogTable = ({ data }) => {
  const [cols] = useState([
    { field: "date", headerName: "Date submitted", widht: 160},
    { field: "subType", headerName: "Type of submission", width: 160},
    { renderCell: function () {
      return (<Button to="/" value={data} renderAs={Link} variant="contained" color="secondary">View</Button>);
    }},
  ]);
  return (
    <>
      <Box height="450px" width="50%">
        <DataGrid columns={cols} rows={data} pageSize={4} />
      </Box>
    </>
  );
};

export default PatientsPersonalLogTable;