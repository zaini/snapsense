import React from "react";
import {
  FormControl,
  FormLabel,
  ModalFooter,
  Button,
  ModalContent,
  Input,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  Center,
} from "@chakra-ui/react";
import Error from "./Error";
import { useForm } from "react-hook-form";

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    errors,
    setError,
    formState,
    clearErrors,
  } = useForm();

  const onSubmit = ({ password, repeat_password }) => {
    clearErrors();
    if (password === repeat_password) {
      // call backend here
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change your password</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Error errors={errors} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl id="password" isRequired>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input name="password" placeholder="Password" ref={register} />
            </FormControl>
            <br />
            <FormControl id="repeat_password" isRequired>
              <FormLabel htmlFor="repeat_password">Repeat Password</FormLabel>
              <Input
                name="repeat_password"
                placeholder="Repeat password"
                ref={register}
              />
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button
            mr={3}
            colorScheme="blue"
            type="submit"
            isLoading={formState.isSubmitting}
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
