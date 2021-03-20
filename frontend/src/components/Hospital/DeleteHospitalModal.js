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

const DeleteHospitalModal = ({ isOpen, onClose, hospital }) => {
  const history = useHistory();

  const [deleteHospital, { loading, error, data }] = useMutation(
    DELETE_HOSPITAL,
    {
      onCompleted(_) {
        history.push("/my/hospitals");
      },
      update(proxy) {
        const data = proxy.readQuery({
          query: GET_HOSPITALS,
        });
        proxy.writeQuery({
          query: GET_HOSPITALS,
          data: {
            getHospitals: data.getHospitals.filter((el) => el.id !== hospital.id),
          },
        });
      },
      onError(_) {}, // Error handled below
    }
  );

  const onSubmit = () => {
    deleteHospital({
      variables: {
        hospital_id: hospital.id,
      },
    });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete {hospital.name}</ModalHeader>
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
            Are you sure you want to delete this hospital? There is no going
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
            Delete Hospital
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteHospitalModal;

const GET_HOSPITALS = gql`
  query getHospitals {
    getHospitals {
      id
      name
      contact_email
    }
  }
`;

const DELETE_HOSPITAL = gql`
  mutation deleteHospital($hospital_id: ID!) {
    deleteHospital(hospital_id: $hospital_id)
  }
`;
