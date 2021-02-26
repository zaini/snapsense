import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Box from '@material-ui/core/Box';

//component to show all the doctors from a hospital the admin is from
const AllDoctorsTable = ({ data }) => {
  const [cols] = useState([
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'firstName', headerName: 'Name', width: 150, sortable: true},
    { field: 'lastName', headerName: 'Surname', width: 150, sortable: true },
  ]);


  return (
    <Box style={{ height: 600, width: '50%' }}>
      <DataGrid rows={data} columns={cols} pageSize={9} />
    </Box>
  );
};

export default AllDoctorsTable;