import { Alert, AlertIcon, Spinner } from "@chakra-ui/react";
import { Center } from "@chakra-ui/layout";
import SubmissionsViewSwitch from "./SubmissionsViewSwitch";

// Takes a list of submissions and shows them in the table and timeline view
const SubmissionsComponent = ({ loading, data, error }) => {
  let markup;

  if (loading) {
    markup = (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  } else if (error) {
    console.log(error);
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
