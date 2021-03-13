import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Table from "../../components/incomplete/Table";
import { Center, Heading } from "@chakra-ui/layout";
import { Alert, AlertIcon, Button, Spinner, Stack } from "@chakra-ui/react";
import { MdBuild } from "react-icons/md";
import { Link } from "react-router-dom";

// Shows all the patients that belong to a doctor
const PatientsPage = () => {
  const { loading, data, error } = useQuery(GET_PATIENTS_AS_DOCTOR);

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
    markup = <Table data={data.getPatientsByDoctor} cols={cols} />;
  }

  return (
    <>
      <Center>
        <Heading>My Patients</Heading>
      </Center>
      <br />
      {markup}
    </>
  );
};

export default PatientsPage;

const GET_PATIENTS_AS_DOCTOR = gql`
  query {
    getPatientsByDoctor {
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
            <Button leftIcon={<MdBuild />}>View Profile</Button>
          </Link>
          <Link to={`/my/patients/${id}/requests/new`}>
            <Button leftIcon={<MdBuild />}>Request Submission</Button>
          </Link>
        </Stack>
      );
    },
    flex: 0.7,
  },
];
