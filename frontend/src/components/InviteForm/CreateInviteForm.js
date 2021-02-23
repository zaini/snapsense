import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Error from "../Error";
import CopyLink from "../CopyLink";

// TODO move this to env
const URL_PREFIX = "http://localhost:3000";

// TODO add validation for email before submitting
const CreateInviteForm = () => {
  const { register, handleSubmit, errors, setError, formState } = useForm();

  const [inviteUser, { data, loading }] = useMutation(INVITE_USER);

  const onSubmit = async ({ email, repeat_email }) => {
    console.log("submitting again");
    if (email === repeat_email) {
      // probably have to await this
      console.log(email);
      inviteUser({ variables: { email: email } })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      console.log(data);
    } else {
      setError("email", {
        type: "manual",
        message: "Emails must be identical.",
      });
    }
  };

  return (
    <Box p="7" borderWidth="1px" borderRadius="lg">
      <Error errors={errors} />
      <form onSubmit={handleSubmit(onSubmit)}>
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
      {data ? (
        <CopyLink link={URL_PREFIX + "/invite/" + data.inviteUser} />
      ) : (
        ""
      )}
    </Box>
  );
};

export default CreateInviteForm;

const INVITE_USER = gql`
  mutation invite_user($email: String!) {
    inviteUser(email: $email)
  }
`;
