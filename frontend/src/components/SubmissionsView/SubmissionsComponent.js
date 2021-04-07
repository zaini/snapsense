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
        {(error.graphQLErrors &&
          error.graphQLErrors[0] &&
          error.graphQLErrors[0].message) ||
          error.message}
      </Alert>
    );
  } else {
    const dataRows = data.getSubmissions;
    markup = (
      <SubmissionsViewSwitch
        data-testid="submissionsViewSwitch"
        data={dataRows}
      />
    );
  }

  return markup;
};

export default SubmissionsComponent;

export const GET_SUBMISSIONS = gql`
  query getSubmissions($patient_id: ID) {
    getSubmissions(patient_id: $patient_id) {
      id
      flag
      createdAt
      Patient {
        id
        fname
        lname
        email
        flag
      }
      Images {
        id
        url
      }
      Answers {
        id
        Question {
          id
          text
        }
        value
        extra
      }
    }
  }
`;
