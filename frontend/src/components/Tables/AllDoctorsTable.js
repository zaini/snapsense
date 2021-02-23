import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";

const AllDoctorsTable = ({ data }) => {
  const [cols] = useState([
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstName', headerName: 'Name', width: 150 },
    { field: 'lastName', headerName: 'Surname', width: 150 },
  ]);


  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={data} columns={cols} pageSize={5} />
    </div>
  );
};

export default AllDoctorsTable;