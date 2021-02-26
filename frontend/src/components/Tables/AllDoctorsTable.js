import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";

//component to show all the doctors from a hospital the admin is from
const AllDoctorsTable = ({ data }) => {
  const [cols] = useState([
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'firstName', headerName: 'Name', width: 150, sortable: true},
    { field: 'lastName', headerName: 'Surname', width: 150, sortable: true },
  ]);


  return (
    <Box height="73vh" width="100%">
      <DataGrid rows={data} columns={cols} autoPageSize />
    </Box>
  );
};

export default AllDoctorsTable;