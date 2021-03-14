import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import { Alert, AlertIcon, Spinner } from "@chakra-ui/react";
import { Center } from "@chakra-ui/layout";
import SubmissionsViewSwitch from "./SubmissionsViewSwitch";

// Takes a list of submissions and shows them in the table and timeline view
const SubmissionsComponent = ({ loading, data, error }) => {
  const location = useParams();
  const { user } = useContext(AuthContext);

  let QUERY;

  // TODO this is so ugly.
  switch (user.accountType) {
    case "PATIENT":
      // If patient, get all their submissions - /my/submissions
      break;
    case "DOCTOR":
      let patient_id = location.patient_id;
      if (patient_id) {
        // If doctor, get all the submissions of the patient they are viewing - /my/patients/show/:patient_id
        break;
      }
      // If doctor, get all the submissions of all their patients - /my/submissions
      break;
    default:
      break;
  }

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
    markup = <SubmissionsViewSwitch data={data_rows} />;
  }

  return markup;
};

export default SubmissionsComponent;
