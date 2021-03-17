import { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Table from "../../components/utils/Table";
import { Center, Heading } from "@chakra-ui/layout";
import { Alert, AlertIcon, Spinner, Stack } from "@chakra-ui/react";
import { AuthContext } from "../../context/auth";
import { FiImage, FiList } from "react-icons/fi";

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
    console.log(data);
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
      type
      deadline
      Submission {
        id
      }
      Patient {
        fname
        lname
        email
      }
      Doctor {
        fname
        lname
        email
      }
    }
  }
`;

const GET_REQUESTS_AS_DOCTOR = gql`
  query {
    getRequestsAsDoctor {
      id
      type
      deadline
      Submission {
        id
      }
      Patient {
        fname
        lname
        email
      }
      Doctor {
        fname
        lname
        email
      }
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
    field: "doctor",
    headerName: "Doctor",
    flex: 0.2,
    renderCell: ({ row }) => {
      const doctor = row.Doctor;
      const { fname, lname, email } = doctor;
      return (
        <p>
          {fname} {lname}
        </p>
      );
    },
  },
  {
    field: "patient",
    headerName: "Patient",
    flex: 0.2,
    renderCell: ({ row }) => {
      const patient = row.Patient;
      const { fname, lname, email } = patient;
      return (
        <p>
          {fname} {lname}
        </p>
      );
    },
  },
  {
    field: "submission",
    headerName: "Submission",
    flex: 0.2,
    renderCell: ({ row }) => {
      const submission = row.Submission;
      // const { fname, lname, email } = submission;
      // TODO instead of showing submission ID, show a button to view the actual submission
      // This button will depend on the account type you are logged in as
      return <p>{"No Submission Made" || submission.id}</p>;
    },
  },
  {
    field: "type",
    headerName: "Type",
    flex: 0.5,
    renderCell: ({ row }) => {
      let type;
      switch (row.type) {
        case 1:
          // Image only
          type = <FiImage />;
          break;
        case 2:
          // Questionnaire only
          type = <FiList />;
          break;
        case 3:
          // Both image and questionnaire
          type = (
            <Stack direction="row" spacing={4}>
              <FiImage /> <FiList />
            </Stack>
          );
          break;
        default:
          break;
      }
      return type;
    },
  },
];
