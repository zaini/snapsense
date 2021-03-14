import { useParams } from "react-router-dom";
import { Alert, AlertIcon, Spinner } from "@chakra-ui/react";
import { Center } from "@chakra-ui/layout";
import SubmissionsViewSwitch from "./SubmissionsViewSwitch";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";

// Takes a list of submissions and shows them in the table and timeline view
const SubmissionsComponent = () => {
  const location = useParams();

  const patient_id = location.patient_id;

  const { loading, data, error } = useQuery(GET_SUBMISSIONS, {
    variables: { patient_id: patient_id },
  });

  let markup;

  if (loading) {
    markup = (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  } else if (error) {
    markup = (
      <Alert status="error">
        <AlertIcon />
        {error.graphQLErrors[0].message}
      </Alert>
    );
  } else {
    let data_rows = data.getSubmissions;
    markup = <SubmissionsViewSwitch data={data_rows} />;
  }

  return markup;
};

export default SubmissionsComponent;

const GET_SUBMISSIONS = gql`
  query getSubmissions($patient_id: ID) {
    getSubmissions(patient_id: $patient_id) {
      id
      Doctor {
        id
        fname
        lname
        email
      }
      Patient {
        id
        fname
        lname
        email
      }
      deadline
      createdAt
    }
  }
`;
