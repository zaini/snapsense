import React from "react";
import { useHistory } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import {
  Button,
  Container,
  ModalFooter,
  ModalContent,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";

import Error from "../utils/Error";

const DeleteAdminModal = ({ isOpen, onClose, admin }) => {
  const history = useHistory();

  const [deleteAdmin, { loading, error, data }] = useMutation(DELETE_ADMIN, {
    onCompleted(_) {
      history.push("/my/admins");
    },
    update(proxy) {
      // Write to cache
      const data = proxy.readQuery({
        query: GET_ADMINS,
      });
      proxy.writeQuery({
        query: GET_ADMINS,
        data: { getAdmins: data.getAdmins.filter((el) => el.id !== admin.id) },
      });
    },
    onError(_) {}, // Error handled below
  });

  const onSubmit = () => {
    deleteAdmin({
      variables: {
        admin_id: admin.id,
      },
    });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete {admin.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {error && (
            <Container p="7" borderRadius="lg">
              <Error
                errors={[
                  {
                    message: error.graphQLErrors[0].message,
                  },
                ]}
              />
            </Container>
          )}
          <Text fontSize="120%">
            Are you sure you want to delete this admin? There is no going
            back...
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            mr={3}
            colorScheme="red"
            type="submit"
            isLoading={loading}
            onClick={onSubmit}
          >
            Delete Admin
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteAdminModal;

const GET_ADMINS = gql`
  query getAdmins {
    getAdmins {
      id
      fname
      lname
      email
      Hospital {
        name
      }
    }
  }
`;

const DELETE_ADMIN = gql`
  mutation deleteAdmin($admin_id: ID!) {
    deleteAdmin(admin_id: $admin_id)
  }
`;
