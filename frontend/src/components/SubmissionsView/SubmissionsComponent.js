import { useParams } from "react-router-dom";
import { Alert, AlertIcon, Spinner } from "@chakra-ui/react";
import { Center } from "@chakra-ui/layout";
import SubmissionsViewSwitch from "./SubmissionsViewSwitch";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";

// Takes a list of submissions and shows them in the table and timeline view
const SubmissionsComponent = () => {
  const location = useParams();

  const { loading, data, error } = useQuery(GET_SUBMISSIONS, {
    variables: { patient_id: location.patient_id },
  });

  console.log(loading, error, data);

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
        {/* TODO error message should show up here */}
        {/* {error.graphQLErrors[0].message} */}
      </Alert>
    );
  } else {
    // let data_rows = data.getSubmissions;
    let data_rows = [];
    console.log(data);
    markup = <SubmissionsViewSwitch data={data_rows} />;
  }

  return markup;
};

export default SubmissionsComponent;

const GET_SUBMISSIONS = gql`
  query getSubmissions($patient_id: Int) {
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
