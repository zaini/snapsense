import { useContext } from "react";
import { AuthContext } from "../context/auth";
import {
  Container,
  Heading,
  Button,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import ChangePasswordModal from "./utils/ChangePasswordModal";
import DeleteAccountModal from "./utils/DeleteAccountModal";
import UserDetails from "./UserDetails";

const UserInfo = () => {
  const { user } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  return (
    <Container>
      <Center>
        <Heading data-testid="profile-header">My Profile</Heading>
      </Center>
      <br />
      <hr />
      <br />
      <UserDetails user={user} />
      <br />

      <Center>
        <Button data-testid="changePasswordButton" onClick={onOpen} colorScheme="blue" mr={4}>
          Change my password
        </Button>
        <Button data-testid="deleteAccountButton" onClick={onDeleteOpen} colorScheme="red">
          Delete my account
        </Button>
      </Center>
      <ChangePasswordModal testName="changePasswordModal" isOpen={isOpen} onClose={onClose} />
      <DeleteAccountModal isOpen={isDeleteOpen} onClose={onDeleteClose} />

      <br />

      <br />
      <hr />
      <br />
    </Container>
  );
};

export default UserInfo;
