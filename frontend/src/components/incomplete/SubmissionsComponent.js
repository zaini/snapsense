import Table from "./Table";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Alert, AlertIcon, Spinner } from "@chakra-ui/react";
import { Flex, Stack } from "@chakra-ui/react";
//import { useContext } from "react";
import { Center, Heading } from "@chakra-ui/layout";
//import { AuthContext } from "../../context/auth";
import { ViewIcon } from "@chakra-ui/icons";

const SubmissionsComponent = ({ account_type, patient_id }) => {
  
  const QUERY =
    account_type === "PATIENT" ? GET_SUBMISSIONS : GET_SUBMISSIONS_BY_PATIENT;

  const { loading, data, error } = useQuery(QUERY);

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
        {/* {error.graphQLErrors[0].message} */}
      </Alert>
    );
  } else {
    let data_rows =
      account_type === "PATIENT"
        ? data.getSubmissions
        : data.getSubmissions({variables: {patient_id: patient_id}}) // check if it is correct at the bottom? with the pass id);
    markup = <Table data={data_rows} cols={cols} />;
  }

  return (
    <>
      <Center>
        <Heading>Submissions History</Heading>
      </Center>
      <br />
      {markup}
    </>
  );
};

export default SubmissionsComponent;

const GET_SUBMISSIONS = gql`
  query {
    getSubmissions {
      id
      fulfilled
    }
  }
`;

//query that pull data for the doctor depending on the patient's id
const GET_SUBMISSIONS_BY_PATIENT = gql`
  query GetSubmissions($patient_id: String!) {
    getSubmissions(patient_id: $patient_id) {
      id
      fulfilled
    }
  }
`;

const cols = [
  {
    field: "id",
    type: "number",
    headerName: "ID",
    flex: 0.3,
    hide: true, 
  },
  {
    field: "createdAt",
    type: "date",
    headerName: "Date submitted",
    sortable: true,
    flex: 1,
  },
  { 
    field: "", 
    headerName: "Type",
    flex: 1,
  },
  {
    field: "",
    headerName: "Actions",
    sortable: false,
    disableClickEventBubbling: true,
    renderCell: ({ row }) => {
      let id = row.id

      return (
        //would the link be different for doctor?
        <Stack direction="row" spacing={4}>
          <Link to={`my/submissions/show/${id}`}>   
            <Button leftIcon={<ViewIcon />} colorScheme="blue">
              View
            </Button>
          </Link>
        </Stack>
      );
    },
    flex: 0.7,
  },
];
