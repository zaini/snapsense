import React, { useState } from "react";
import { Container } from "@material-ui/core";
import AllDoctorsTable from "../components/Tables/AllDoctorsTable";

// Page for showing the logs of all the doctors from the hospital the admin is from
const AllDoctorsPage = () => {
  const [hospitalName] = useState("Guy's Hospital");

  const [rows] = useState([
    { id: 1, lastName: 'Snow', firstName: 'Jon'},
    { id: 2, lastName: 'Lannister', firstName: 'Cersei' },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime' },
    { id: 4, lastName: 'Stark', firstName: 'Arya' },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys' },
    { id: 6, lastName: 'Melisandre', firstName: null },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara' },
    { id: 8, lastName: 'Frances', firstName: 'Rossini' },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey' },
  ]);

    return (
      <Container>
        <h1>Doctors from {hospitalName}</h1>
        <AllDoctorsTable data={rows} />
      </Container>
    );
};

export default AllDoctorsPage;