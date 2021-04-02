import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  Alert,
  AlertIcon,
  Box,
  Center,
  Heading,
  Spinner,
} from "@chakra-ui/react";

import ViewAdmin from "../../components/Admin/ViewAdmin";

const AdminPage = () => {
  const location = useParams();

  const { loading, data: { getAdminById: admin } = {}, error } = useQuery(
    GET_ADMIN,
    {
      variables: { admin_id: location.admin_id },
    }
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
    markup = (
      <>
        <Heading textAlign="center">{admin.fname}'s Profile</Heading>
        <ViewAdmin admin={admin} />
      </>
    );
  }

  return <Box data-testid="admin-profile">{markup}</Box>;
};

export default AdminPage;

const GET_ADMIN = gql`
  query getAdminById($admin_id: ID!) {
    getAdminById(admin_id: $admin_id) {
      id
      fname
      lname
      email
      Hospital {
        name
      }
    }
  }
`;
