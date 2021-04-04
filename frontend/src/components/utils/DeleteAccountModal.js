import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "react-hook-form";
import {
  ModalFooter,
  Button,
  ModalContent,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";

import Error from "./Error";
import PasswordConfirmationForm from "./PasswordConfirmationForm";
import { AuthContext } from "../../context/auth";

const ChangePasswordModal = ({ testName, isOpen, onClose }) => {
  const history = useHistory();
  const { logout } = useContext(AuthContext);
  const { register, handleSubmit, errors, setError, formState } = useForm();

  const [deleteAccount, { loading }] = useMutation(DELETE_ACCOUNT, {
    onCompleted(_) {
      logout();
      history.push("/login");
    },
    onError(err) {
      const message =
        (err.graphQLErrors && err.graphQLErrors[0].message) || err.message;
      setError("password", { type: "manual", message });
    },
  });

  const onSubmit = ({ password, repeat_password }) => {
    if (password === repeat_password) {
      deleteAccount({
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
      <ModalContent data-testid={testName}>
        <ModalHeader>Delete your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Error errors={errors} mb="4" />
          <PasswordConfirmationForm
            register={register}
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            mr={3}
            data-testid="formDeleteAccount"
            colorScheme="red"
            type="submit"
            isLoading={formState.isSubmitting || loading}
            onClick={handleSubmit(onSubmit)}
          >
            Delete Account
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChangePasswordModal;

export const DELETE_ACCOUNT = gql`
  mutation deleteAccount($password: String!, $password_confirmation: String!) {
    deleteAccount(
      password: $password
      password_confirmation: $password_confirmation
    )
  }
`;
