import { Heading } from "@chakra-ui/layout";
import React from "react";
import Table from "../../components/incomplete/Table";
import { Container } from "@material-ui/core";

// If admin: shows all doctors from the same hospital
// If patient: shows all doctors that you have
const DoctorsPage = () => {
  const cols = [
    {
      field: "id",
      type: "number",
      headerName: "ID",
      sortable: true,
      flex: 0.3,
    },
    {
      field: "fname",
      headerName: "First Name",
      sortable: true,
      flex: 1,
    },
    {
      field: "lname",
      headerName: "Last Name",
      sortable: true,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      sortable: true,
      flex: 2,
    },
  ];

  const data = [
    { id: 2, fname: "firstname", lname: "lastname", email: "email@email.com" },
  ];

  return (
    <Container>
      <Heading>My Doctors</Heading>
      <br />
      <Table data={data} cols={cols} />
    </Container>
  );
};

export default DoctorsPage;
