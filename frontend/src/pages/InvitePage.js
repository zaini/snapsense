import React from "react";
import InviteForm from "../components/InviteForm/InviteForm";
import { Container, Alert, AlertIcon, Spinner } from "@chakra-ui/react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { decode } from "jsonwebtoken";

const InvitePage = (props) => {
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
  return <Container pt="20px">{markup}</Container>;
};

export default InvitePage;

const CHECK_INVITATION = gql`
  query checkInvitation($invitationToken: String!) {
    checkInvitation(invitationToken: $invitationToken)
  }
`;
