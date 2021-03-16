import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Box } from "@chakra-ui/react";


//SuperTable component
const Table = ({ data, cols }) => {
  return (
    <Box height="73vh" width="100%">
      <DataGrid columns={cols} rows={data} autoPageSize />
    </Box>
  );
};

export default Table;
