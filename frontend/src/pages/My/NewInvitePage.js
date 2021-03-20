import { Container, Center, Heading } from "@chakra-ui/react";
import CreateInviteForm from "../../components/InviteForm/CreateInviteForm";

// Page to create a new invite
const NewInvitePage = () => {
  return (
    <Container pt="20px">
      <Center>
        <Heading>Create Invitation</Heading>
      </Center>
      <br />
      <hr />
      <br />
      <CreateInviteForm />
    </Container>
  );
};

export default NewInvitePage;
