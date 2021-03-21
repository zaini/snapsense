import React from "react";
import {
  Container,
  Alert,
  AlertIcon,
  Spinner,
  Heading,
  Center,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { decode } from "jsonwebtoken";

import InviteForm from "../../components/InviteForm/InviteForm";

// This shows a single invitation
const ShowInvitePage = (props) => {
  const {
    loading,
    data: { checkInvitation: invitation } = {},
    error,
  } = useQuery(CHECK_INVITATION, {
    variables: { invitationToken: props.match.params.token_id },
  });

  let markup;

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
    markup = (
      <InviteForm
        invitation={{
          ...decode(invitation),
          invitationToken: invitation,
        }}
      />
    );
  }
  return (
    <Container pt="20px">
      <Center>
        <Heading>You have an invite!</Heading>
      </Center>
      <br />
      <hr />
      <br />
      {markup}
    </Container>
  );
};

export default ShowInvitePage;

const CHECK_INVITATION = gql`
  query checkInvitation($invitationToken: String!) {
    checkInvitation(invitationToken: $invitationToken)
  }
`;
