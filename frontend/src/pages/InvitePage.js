import { useState, useEffect } from "react";
import InviteForm from "../components/InviteForm/InviteForm";
import { Container } from "@chakra-ui/react";

const InvitePage = (props) => {
  const [invitation, setInvitation] = useState({
    inviterEmail: "",
    newAcccountEmail: "",
    accountType: "",
    accountExists: "",
  });

  useEffect(() => {
    // log person out of all accounts whne they go to this page
    // this will actually be decrypted first
    const token_id = props.match.params.token_id;
    // imagine we decrypt the token and get the invitees info
    // checkInvitation(token_id)
    // if theres an error, show an error TODO add this
    // if no errors, continue
    // decode the return

    const invite = {
      inviterEmail: "bob@nhs.net",
      newAcccountEmail: "jane@doemail.com",
      accountType: "PATIENT",
      accountExists: false,
      invitationToken: token_id,
    };
    setInvitation(invite);

    // check if the newAccountEmail already has an account.
    // would be done by a GraphQL query
    const accountExists = false;
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
