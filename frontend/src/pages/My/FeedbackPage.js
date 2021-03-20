import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  Button,
  Center,
  Heading,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

import Table from "../../components/utils/Table";

// Show all the hospitals (for the admin)
const FeedbackPage = () => {
  const { loading, data: { getFeedback: feedback } = {}, error } = useQuery(
    GET_FEEDBACK
  );

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
    markup = <Table data={feedback} cols={cols} />;
  }

  return (
    <Stack spacing={4}>
      <Center>
        <Heading>All Feedback</Heading>
      </Center>
      <hr />
      {markup}
    </Stack>
  );
};

export default FeedbackPage;

const GET_FEEDBACK = gql`
  query getFeedback {
    getFeedback {
      id
      stars
      extra
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
    field: "stars",
    headerName: "Number of Stars",
    renderCell: ({ row }) => {
      return (
        <Text>{row.stars === 0 ? "No stars 😢" : "⭐".repeat(row.stars)}</Text>
      );
    },
    flex: 0.5,
  },
  {
    field: "extra",
    headerName: "Extra Information",
    renderCell: ({ row }) => {
      return (
        <Text>{row.extra === null ? "No extra information" : row.extra}</Text>
      );
    },
    flex: 0.7,
  },
  {
    field: "",
    headerName: "View",
    sortable: false,
    disableClickEventBubbling: true,
    renderCell: ({ row }) => {
      let id = row.id;
      return (
        <Link to={`/my/feedback/show/${id}`}>
          <Button leftIcon={<ViewIcon />} colorScheme="blue">
            View
          </Button>
        </Link>
      );
    },
    flex: 0.7,
  },
];
