import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  Heading,
  Container,
  Center,
  Spinner,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

import NewRequestForm from "../../components/Request/NewRequestForm";
import Error from "../../components/utils/Error";

// Form for creating a new request for patients
const NewRequestPage = () => {
  const [errors, setError] = useState();

  // Get the patient id from the url params
  const params = useParams();
  const patientId = params.patient_id;

  // Perform the query that gets the patient using the id supplied in the query param
  // Only return the patient of they exist and belong to the doctor
  const { loading, data: { getPatientAsDoctor: patient } = {} } = useQuery(
    GET_PATIENT_AS_DOCTOR,
    {
      onCompleted(data) {
        // Clear the error
        setError();
      },
      onError(err) {
        //Set the error object to a graphql error
        setError([
          {
            message:
              (err.graphQLErrors && err.graphQLErrors[0].message) ||
              err.message,
          },
        ]);
      },
      variables: {
        patient_id: patientId,
      },
    }
  );

  if (loading) {
    // Display a spinner
    return (
      <Container p="7" borderRadius="lg" mt="20">
        <Center>
          <Spinner size="xl" />
        </Center>
      </Container>
    );
  } else if (errors) {
    // Display the errors object
    return (
      <Container p="7" borderRadius="lg" mt="20">
        <Error errors={errors} />
      </Container>
    );
  } else {
    // Display the request form
    if (patient) {
      return (
        <Container maxW="container.xl">
          <Heading textAlign="center">
            Submission Request for {patient.fname} {patient.lname}
          </Heading>
          <Container p="7" borderWidth="1px" borderRadius="lg" mt="20">
            <Tabs>
              <TabList>
                <Tab>Single</Tab>
                <Tab>Scheduled</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <NewRequestForm periodic={false} patient={patient} />
                </TabPanel>
                <TabPanel>
                  <NewRequestForm periodic={true} patient={patient} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Container>
        </Container>
      );
    } else {
      return (
        <Alert status="error" borderRadius="50px" mb={4} textAlign="center">
          <AlertIcon />
          Invalid Patient!
        </Alert>
      );
    }
  }
};

export default NewRequestPage;

const GET_PATIENT_AS_DOCTOR = gql`
  query getPatientAsDoctor($patient_id: ID!) {
    getPatientAsDoctor(patient_id: $patient_id) {
      id
      fname
      lname
    }
  }
`;
