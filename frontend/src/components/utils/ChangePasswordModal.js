import React from "react";
import { useForm } from "react-hook-form";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import {
  Alert,
  AlertIcon,
  ModalFooter,
  Button,
  ModalContent,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";

import Error from "./Error";
import PasswordConfirmationForm from "./PasswordConfirmationForm";

const ChangePasswordModal = ({ testName, isOpen, onClose }) => {
  const { register, handleSubmit, errors, setError, formState } = useForm();

  const [changePassword, { loading, data }] = useMutation(CHANGE_PASSWORD, {
    onError(err) {
      setError("password", {
        type: "manual",
        message:
          (err.graphQLErrors && err.graphQLErrors[0].message) || err.message,
      });
    },
  });

  const onSubmit = ({ password, repeat_password }) => {
    if (password === repeat_password) {
      changePassword({
        variables: {
          password,
          password_confirmation: repeat_password,
        },
      });
    } else {
      setError("password", {
        type: "manual",
        message: "'Password' must match 'Repeat Password'",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent data-testid={testName} >
        <ModalHeader>
          Change your password
          <Text fontSize="xs" pt="5px">
            Enter your new password
          </Text>
        </ModalHeader>

        <ModalCloseButton />
        <ModalBody pb={6}>
          <Error errors={errors} mb="4" />
          {Object.keys(errors).length === 0 && data && (
            <Alert data-testid="updateAlert" status="success" variant="subtle" mb="4">
              <AlertIcon />
              Password has been updated!
            </Alert>
          )}
          <PasswordConfirmationForm
            register={register}
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            mr={3}
            colorScheme="blue"
            type="submit"
            isLoading={formState.isSubmitting || loading}
            onClick={handleSubmit(onSubmit)}
          >
            Change Password
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChangePasswordModal;

export const CHANGE_PASSWORD = gql`
  mutation changePassword($password: String!, $password_confirmation: String!) {
    changePassword(
      password: $password
      password_confirmation: $password_confirmation
    )
  }
`;
