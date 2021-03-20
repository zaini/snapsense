import React from "react";
import { Heading, Container } from "@chakra-ui/react";

import NewHospitalForm from "../../components/Hospital/NewHospitalForm";

const NewHospital = () => {
  return (
    <Container>
      <Heading textAlign="center">Create a Hospital</Heading>
      <br />
      <hr />
      <br />
      <NewHospitalForm />
    </Container>
  );
};

export default NewHospital;
