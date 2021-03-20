import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Container,
  Input,
  Heading,
  Center,
  Alert,
  AlertIcon,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";

import DeleteAdminModal from "./DeleteAdminModal";
import CopyLink from "../utils/CopyLink";

const ViewAdmin = ({ admin }) => {
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  return (
    <Container>
      <br />
      <hr />
      <br />
      <FormControl id="id">
        <FormLabel>ID</FormLabel>
        <Input value={admin.id} isReadOnly />
      </FormControl>
      <br />
      <FormControl id="fname">
        <FormLabel>First name</FormLabel>
        <Input value={admin.fname} isReadOnly />
      </FormControl>
      <br />
      <FormControl id="lname">
        <FormLabel>Last name</FormLabel>
        <Input value={admin.lname} isReadOnly />
      </FormControl>
      <br />
      <FormControl id="hospital">
        <FormLabel>Hospital</FormLabel>
        <Input value={admin.Hospital.name} isReadOnly />
      </FormControl>
      <br />
      <FormControl id="email">
        <FormLabel>Email</FormLabel>
        <CopyLink link={admin.email} />
      </FormControl>
      <Center>
        <Button onClick={onDeleteOpen} colorScheme="red">
          Delete Admin
        </Button>
      </Center>
      <DeleteAdminModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        admin={admin}
      />
      <br />
      <br />
      <hr />
      <br />
    </Container>
  );
};

export default ViewAdmin;
