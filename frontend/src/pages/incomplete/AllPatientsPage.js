import React, { useState } from "react";
import PatientsTable from "../../components/PatientsTable";
import PatientsTimeline from "../../components/PatientsTimeline";
import { Switch, FormLabel } from "@chakra-ui/react";

// Page for showing the logs of all the patients from the hospital the admin is from
const AllPatientsPage = () => {
  const [hospitalName] = useState("Guy's Hospital");
  const [viewTimeline, setViewTimeline] = useState(false);

  const [rows] = useState([
    { id: 1, lastName: "Snow", firstName: "Jon" },
    { id: 2, lastName: "Lannister", firstName: "Cersei" },
    { id: 3, lastName: "Lannister", firstName: "Jaime" },
    { id: 4, lastName: "Stark", firstName: "Arya" },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys" },
    { id: 6, lastName: "Melisandre", firstName: null },
    { id: 7, lastName: "Clifford", firstName: "Ferrara" },
    { id: 8, lastName: "Frances", firstName: "Rossini" },
    { id: 9, lastName: "Roxie", firstName: "Harvey" },
  ]);

  const cols = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "firstName", headerName: "Name", width: 150, sortable: true },
    { field: "lastName", headerName: "Surname", width: 150, sortable: true },
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
        <PatientsTimeline />
      ) : (
        <PatientsTable hospitalName={hospitalName} rows={rows} cols={cols} />
      )}
    </>
  );
};

export default AllPatientsPage;
