import React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridColumnsToolbarButton,
  GridFilterToolbarButton,
} from "@material-ui/data-grid";

// Component which shows the patients history of uploads
// TODO: Update the link to the page which displays the details of the upload
const Table = ({ data, cols }) => {
  return (
    <Box height="73vh" width="100%">
      <DataGrid columns={cols} rows={data} autoPageSize />
    </Box>
  );
}

//TODO: Update the link to the page which displays the details of the upload

export default function Table({ data, cols }) {
  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        columns={cols}
        rows={data}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}
