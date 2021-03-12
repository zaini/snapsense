import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Box } from "@chakra-ui/react";

// Component which shows the patients history of uploads
// TODO: Update the link to the page which displays the details of the upload
const Table = ({ data, cols }) => {
  return (
    <Box height="73vh">
      <DataGrid columns={cols} rows={data} />
    </Box>
  );
};

//TODO: Update the link to the page which displays the details of the upload

export default Table;
