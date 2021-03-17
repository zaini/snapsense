import { Container } from "@chakra-ui/react";
import CreateInviteForm from "../../components/InviteForm/CreateInviteForm";

// Page to create a new invite
const NewInvitePage = () => {
  return (
    <Container pt="20px">
      <CreateInviteForm />
    </Container>
  );
};

export default NewInvitePage;
