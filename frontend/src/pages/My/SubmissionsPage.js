import React, { useState } from "react";
import Table from "../../components/incomplete/Table";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Alert, AlertIcon, Spinner } from "@chakra-ui/react";
import { Flex, Heading, Stack } from "@chakra-ui/react";
import { Switch, FormLabel } from "@chakra-ui/react";
import PatientsPersonalLogTimeline from "../../components/PatientsPersonalLogTimeline";

// patient: view all your submissions
const SubmissionsPage = () => {
  const [patientName] = useState("Bob");
  const [viewTimeline, setViewTimeline] = useState(false);

  let markup;

  const { loading, data, error } = useQuery(GET_SUBMISSIONS);
  if (loading) {
    markup = <Spinner size="xl" />;
  } else if (error) {
    markup = (
      <Alert status="error">
        <AlertIcon />
        {error.graphQLErrors[0].message}
      </Alert>
    );
  } else {
    const rows = data.getSubmissionsByPatient || [];

    const cols = [
      { field: "id", hide: true },
      {
        field: "fulfilled",
        headerName: "Date submitted",
        width: 150,
        type: "date",
        sortable: true,
      },
      //{ field: "type", headerName: "Type", width: 90}, WHERE IS TYPE IN DB?
      {
        field: "Action",
        headerName: "Action",
        width: 100,
        renderCell: function () {
          return (
            <Button value={rows} variant="contained" color="secondary">
              <Link to="/">View</Link>
            </Button>
          );
        },
      },
    ];
    markup = (
      <Flex w={"100%"}>
        <Stack spacing={3} w={"100%"}>
          <Heading>Your history of submissions {patientName}</Heading>
          <Table data={rows} cols={cols} />
        </Stack>
      </Flex>
    );
  }
  //return markup;

  return (
    <>
      <FormLabel htmlFor="toggle" mb="0">
        Enable timeline view?
      </FormLabel>
      <Switch
        id="toggle"
        size="md"
        onChange={() => setViewTimeline(!viewTimeline)}
      />
      {viewTimeline ? (
        <PatientsPersonalLogTimeline
          rows={data.getSubmissionsByPatient || []}
        />
      ) : (
        markup
      )}
    </>
  );
};

export default SubmissionsPage;

const GET_SUBMISSIONS = gql`
  query {
    getSubmissions {
      id
      fulfilled
    }
  }
`;

const GET_SUBMISSIONS_BY_PATIENT = gql`
  query GetSubmissions($patient_id: String!) {
    getSubmissions(patient_id: $patient_id) {
      id
      fulfilled
    }
  }
`;
