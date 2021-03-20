import { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Table from "../../components/utils/Table";
import { Center, Heading } from "@chakra-ui/layout";
import { Alert, AlertIcon, Spinner } from "@chakra-ui/react";
import { AuthContext } from "../../context/auth";

// If admin: shows all doctors from the same hospital
// If patient: shows all doctors that you have
const DoctorsPage = () => {
  const { user } = useContext(AuthContext);
  const { accountType } = user;
  const QUERY =
    accountType === "PATIENT" ? GET_DOCTORS_AS_PATIENT : GET_DOCTORS_AS_ADMIN;

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
        ? data.getDoctorsAsPatient
        : data.getDoctorsAsAdmin;
    markup = <Table data={data_rows} cols={cols} />;
  }

  return (
    <>
      <Center>
        <Heading>My Doctors</Heading>
      </Center>
      <br />
      <hr />
      <br />
      {markup}
    </>
  );
};

export default DoctorsPage;

const GET_DOCTORS_AS_PATIENT = gql`
  query {
    getDoctorsAsPatient {
      id
      fname
      lname
      email
    }
  }
`;

const GET_DOCTORS_AS_ADMIN = gql`
  query {
    getDoctorsAsAdmin {
      id
      fname
      lname
      email
    }
  }
`;

const cols = [
  {
    field: "id",
    type: "number",
    headerName: "ID",
    sortable: true,
    flex: 0.3,
  },
  {
    field: "fname",
    headerName: "First Name",
    sortable: true,
    flex: 1,
  },
  {
    field: "lname",
    headerName: "Last Name",
    sortable: true,
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    sortable: true,
    flex: 2,
  },
];
