import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Switch, FormLabel } from "@chakra-ui/react";
import PatientsPersonalLogTable from "../../components/PatientsPersonalLogTable";
import PatientsPersonalLogTimeline from "../../components/PatientsPersonalLogTimeline";

// Page which displays a table of uploads from the patient logged on
const PatientsPersonalLogPage = () => {
  // TODO: Use object from backend to obtain the value of name
  const [patientName] = useState("Bob");
  const [viewTimeline, setViewTimeline] = useState(false);

  const rows = [
    { id: 1, date: "2020-02-14", subType: "Photo" },
    { id: 2, date: "2021-01-24", subType: "Photo" },
    { id: 3, date: "2021-01-27", subType: "Photo" },
    { id: 4, date: "2021-02-20", subType: "Photo" },
    { id: 5, date: "2021-02-21", subType: "Report" },
    { id: 6, date: "2021-02-22", subType: "Both" },
    { id: 7, date: "2021-02-23", subType: "Report" },
    { id: 8, date: "2021-02-24", subType: "Photo" },
    { id: 9, date: "2021-02-25", subType: "Photo" },
    { id: 10, date: "2021-02-26", subType: "Both" },
    { id: 11, date: "2021-02-27", subType: "Photo" },
    { id: 12, date: "2021-02-28", subType: "Photo" },
  ];

  const cols = [
    { field: "id", headerName: "ID", hide: true, width: 80 },
    {
      field: "date",
      headerName: "Date submitted",
      width: 150,
      type: "date",
      sortable: true,
    },
    { field: "subType", headerName: "Type", width: 90 },
    {
      field: "Action",
      headerName: "Action",
      width: 100,
      renderCell: function () {
        return (
          <Button value={rows} variant="contained" color="secondary">
            <Link to="/">View</Link>
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <FormLabel htmlFor="toggle" mb="0">
        Enable timeline view?
      </FormLabel>
      <Switch
        id="toggle"
        size="md"
        onChange={() => setViewTimeline(!viewTimeline)}
      />
      {viewTimeline ? (
        <PatientsPersonalLogTimeline />
      ) : (
        <PatientsPersonalLogTable
          patientName={patientName}
          rows={rows}
          cols={cols}
        />
      )}
    </>
  );
};

export default PatientsPersonalLogPage;
