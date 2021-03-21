import React from "react";
import {
  Button,
  Center,
  Container,
  Divider,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";

import DeleteAdminModal from "./DeleteAdminModal";
import AdminDetails from "./AdminDetails";

const ViewAdmin = ({ admin }) => {
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  return (
    <Container>
      <Stack spacing={4}>
        <hr />
        <AdminDetails admin={admin} />
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
        <hr />
      </Stack>
    </Container>
  );
};

export default ViewAdmin;