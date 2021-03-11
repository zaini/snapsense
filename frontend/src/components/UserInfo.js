import { useContext } from "react";
import { AuthContext } from "../context/auth";
import {
  FormControl,
  FormLabel,
  Container,
  Input,
  Heading,
  Button,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import CopyLink from "./utils/CopyLink";
import ChangePasswordModal from "./utils/ChangePasswordModal";

const UserInfo = () => {
  const { user } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Container>
      <Center>
        <Heading>My Profile</Heading>
      </Center>
      <br />
      <hr />
      <br />
      <FormControl id="first_name">
        <FormLabel>First name</FormLabel>
        <Input value={user.fname} isReadOnly />
      </FormControl>
      <br />
      <FormControl id="last_name">
        <FormLabel>Last name</FormLabel>
        <Input value={user.lname} isReadOnly />
      </FormControl>
      <br />
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <CopyLink link={user.email} />
      </FormControl>
      <br />

      <Center>
        <Button onClick={onOpen} colorScheme="blue">
          Change my password
        </Button>
      </Center>
      <ChangePasswordModal isOpen={isOpen} onClose={onClose} />

      <br />

      <br />
      <hr />
      <br />
    </Container>
  );
};

export default UserInfo;
