import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Box } from "@chakra-ui/react";

<<<<<<< HEAD
// Component which shows the patients history of uploads

=======

//SuperTable component
>>>>>>> 85281a97c93186c1090e382d3dc407208f6360d7
const Table = ({ data, cols }) => {
  return (
    <Box height="73vh" width="100%">
      <DataGrid columns={cols} rows={data} autoPageSize />
    </Box>
  );
};

export default Table;
