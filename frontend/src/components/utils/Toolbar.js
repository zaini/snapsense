import React from "react";
import {
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";

const Toolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

export default Toolbar;
