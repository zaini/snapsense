import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Box } from "@material-ui/core";

// Component which shows the patients history of uploads
//TODO: Update the link to the page which displays the details of the upload
const Table = ({ data, cols }) => {
  return (
    <>
      <Box height="73vh" width="100%">
        <DataGrid columns={cols} rows={data} autoPageSize />
      </Box>
    </>
  );
};

export default Table;
