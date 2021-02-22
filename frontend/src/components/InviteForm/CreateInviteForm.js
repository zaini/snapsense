import { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

// TODO add validation
const CreateInviteForm = () => {
  const { register, handleSubmit, errors, formState } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <Box p="7" borderWidth="1px" borderRadius="lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormErrorMessage>
          {errors.repeat_email && errors.repeat_email.message}
        </FormErrorMessage>
        <FormControl id="email" isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input name="email" placeholder="Email" ref={register} />
        </FormControl>
        <br />
        <FormControl id="repeat_email" isRequired>
          <FormLabel htmlFor="repeat_email">Repeat Email</FormLabel>
          <Input
            name="repeat_email"
            placeholder="Repeat email"
            ref={register}
          />
        </FormControl>
        <br />
        <Center>
          <Button
            mt={4}
            colorScheme="blue"
            type="submit"
            isLoading={formState.isSubmitting}
          >
            Send Invite
          </Button>
        </Center>
      </form>
    </Box>
  );
};

export default CreateInviteForm;
