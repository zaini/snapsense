import { useState, useEffect } from "react";
import InviteForm from "../components/InviteForm";
import { Box, Container } from "@chakra-ui/react";

const InvitePage = (props) => {
  const [invitation, setInvitation] = useState({
    inviterEmail: "",
    newAcccountEmail: "",
    accountType: "",
    accountExists: "",
  });

  useEffect(() => {
    // this will actually be decrypted first
    const token_id = props.match.params.token_id;
    // imagine we decrypt the token and get the invitees info
    const invite = {
      inviterEmail: "bob@nhs.net",
      newAcccountEmail: "jane@doemail.com",
      accountType: "PATIENT",
      accountExists: false,
    };
    setInvitation(invite);

    // check if the newAccountEmail already has an account.
    // would be done by a GraphQL query
    const accountExists = true;
    if (accountExists) {
      setInvitation({ ...invite, accountExists: true });
    }
  }, []);

  return (
    <Container pt="20px">
      <InviteForm invitation={invitation} />
    </Container>
  );
};

export default InvitePage;
