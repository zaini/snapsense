import { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import Table from "../../components/utils/Table";
import { Center, Heading } from "@chakra-ui/layout";
import { Alert, AlertIcon, Spinner, Button } from "@chakra-ui/react";
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
      <hr />
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
        flag
        createdAt
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
        flag
        createdAt
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
    hide: true,
  },
  {
    field: "doctor",
    headerName: "Doctor",
    flex: 0.2,
    renderCell: ({ row }) => {
      const doctor = row.Doctor;
      const { fname, lname } = doctor;
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
      const { fname, lname } = patient;
      return (
        <p>
          {fname} {lname}
        </p>
      );
    },
  },
  {
    field: "deadline",
    headerName: "Deadline",
    flex: 0.2,
    renderCell: ({ row }) => {
      const deadline_timestamp = parseInt(row.deadline);
      const deadline_date = new Date(deadline_timestamp);
      return <p>{deadline_date.toDateString()}</p>;
    },
  },
  {
    field: "type",
    headerName: "Requested Submission Type",
    flex: 0.5,
    renderCell: ({ row }) => {
      return (
        <p>
          {row.type === 1 && "📷"} {row.type === 2 && "📝"}{" "}
          {row.type === 3 && "📷📝"}
        </p>
      );
    },
  },
  {
    field: "submission",
    headerName: "Submission",
    flex: 0.4,
    renderCell: ({ row }) => {
      const submission = row.Submission;
      if (submission) {
        return (
          <Button
            as={Link}
            to={`/my/submissions/show/${submission.id}`}
            colorScheme="blue"
          >
            View Submission
          </Button>
        );
      } else {
        return <p>No Submission Made</p>;
      }
    },
  },
];
