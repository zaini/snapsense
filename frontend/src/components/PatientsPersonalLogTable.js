import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Box } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom"
// Component which shows the patients history of uploads
//TODO: Update the link to the page which displays the details of the upload
const PatientsPersonalLogTable = ({ data }) => {
  const [cols] = useState([
    { field: "id", headerName: "ID", hide: true, width: 80 },
    { field: "date", headerName: "Date submitted", width: 150, type: 'date', sortable: true},
    { field: "subType", headerName: "Type", width: 90},
    { field: "Action",
      headerName: "Action",
      width: 100,
      renderCell: function () {
      return (<Button value={data} variant="contained" color="secondary"><Link to ='/' >View</Link></Button>);
    }}
  ]);
  return (
    <>
      <Box height="73vh" width="100%">
        <DataGrid columns={cols} rows={data} autoPageSize />
      </Box>
    </>
  );
};

export default PatientsPersonalLogTable;