import React from "react";
import { Heading, Container } from "@chakra-ui/react";

import NewRequestForm from "../../components/Request/NewRequestForm";

// Form for creating a new request for patients
const NewRequestPage = () => {
  const patient = {
    name: "Sick Patient",
  };

  return (
    <Container maxW="container.xl">
      <Heading textAlign="center">
        Submission Request for {patient.name}
      </Heading>
      <Container p="7" borderWidth="1px" borderRadius="lg" mt="20">
        <NewRequestForm patient={patient} />
      </Container>
    </Container>
  );
};

export default NewRequestPage;
