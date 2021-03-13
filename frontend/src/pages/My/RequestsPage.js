import { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Table from "../../components/incomplete/Table";
import { Center, Heading } from "@chakra-ui/layout";
import { Alert, AlertIcon, Button, Spinner, Stack } from "@chakra-ui/react";
import { ViewIcon, CalendarIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";

// If patient: shows all requests that have been made in a table
// If doctor: shows all requests made in a table
const RequestsPage = () => {
  const { user } = useContext(AuthContext);
  const { accountType } = user;
  const QUERY =
    accountType === "PATIENT"
      ? GET_REQUESTS_AS_PATIENT
      : GET_REQUESTS_AS_DOCTOR;

  const { loading, data, error } = useQuery(QUERY);

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
    let data_rows =
      accountType === "PATIENT"
        ? data.getRequestsAsPatient
        : data.getRequestsAsDoctor;
    markup = <Table data={data_rows} cols={cols} />;
  }

  return (
    <>
      <Center>
        <Heading>My Requests</Heading>
      </Center>
      <br />
      {markup}
    </>
  );
};

export default RequestsPage;

const GET_REQUESTS_AS_PATIENT = gql`
  query {
    getRequestsAsPatient {
      id
      doctor_id
      submission_id
      type
      deadline
      fulfilled
    }
  }
`;

const GET_REQUESTS_AS_DOCTOR = gql`
  query {
    getRequestsAsDoctor {
      id
      patient_id
      submission_id
      type
      deadline
      fulfilled
    }
  }
`;

const cols = [
  {
    field: "id",
    type: "number",
    headerName: "ID",
    flex: 0.2,
  },
  {
    field: "fname",
    headerName: "First Name",
    flex: 0.5,
  },
  {
    field: "lname",
    headerName: "Last Name",
    flex: 0.5,
  },
  {
    field: "",
    headerName: "Actions",
    sortable: false,
    disableClickEventBubbling: true,
    renderCell: ({ row }) => {
      let id = row.id;
      return (
        <Stack direction="row" spacing={4}>
          <Link to={`/my/patients/${id}`}>
            <Button leftIcon={<ViewIcon />} colorScheme="blue">
              View Profile
            </Button>
          </Link>
          <Link to={`/my/patients/${id}/requests/new`}>
            <Button leftIcon={<CalendarIcon />} colorScheme="blue">
              Request Submission
            </Button>
          </Link>
        </Stack>
      );
    },
    flex: 0.7,
  },
];
