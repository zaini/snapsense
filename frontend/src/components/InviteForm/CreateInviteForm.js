import { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const CreateInviteForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  const [inviteEmail, setInviteEmail] = useState("");

  return (
    <Box p="7" borderWidth="1px" borderRadius="lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input placeholder="Email" />
        </FormControl>
        <br />
        <FormControl id="repeat_email" isRequired>
          <FormLabel>Repeat Email</FormLabel>
          <Input placeholder="Repeat email" />
        </FormControl>
        <br />
        <Center>
          <Button mt={4} colorScheme="blue" type="submit">
            Send Invite
          </Button>
        </Center>
      </form>
    </Box>
  );
};

export default CreateInviteForm;
