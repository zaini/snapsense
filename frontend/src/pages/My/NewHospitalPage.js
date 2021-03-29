import React from "react";
import { Heading, Container, Stack } from "@chakra-ui/react";

import NewHospitalForm from "../../components/Hospital/NewHospitalForm";

const NewHospital = () => {
  return (
    <Container>
      <Stack spacing={4}>
        <Heading data-testid="hospitalNewHeading" textAlign="center">
          Create a Hospital
        </Heading>
        <hr />
        <NewHospitalForm />
      </Stack>
    </Container>
  );
};

export default NewHospital;
