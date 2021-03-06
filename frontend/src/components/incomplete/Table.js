import React from "react";
import { Box } from "@material-ui/core";
import {
  DataGrid,
  GridToolbarContainer,
  GridColumnsToolbarButton,
  GridFilterToolbarButton,
} from "@material-ui/data-grid";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridColumnsToolbarButton />
      <GridFilterToolbarButton />
    </GridToolbarContainer>
  );
}

// Component which shows the patients history of uploads
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
