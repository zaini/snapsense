import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { AuthContext } from "../context/auth";
import Error from "../components/Error";

const LoginForm = ({ accountType, redirect }) => {
  const history = useHistory();
  const context = useContext(AuthContext);
  const [values, setValues] = useState({});

  const { register, handleSubmit, errors, setError, formState } = useForm();

  const [login, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      if (redirect) {
        history.push(redirect);
      }
    },
    onError(err) {
      const message = err.graphQLErrors[0].message;
      // We have to assign this to a field in the form for it to let us resubmit after an error
      setError("email", { type: "manual", message });
    },
    variables: values,
  });

  const onSubmit = async ({ email, password }) => {
    console.log("submitting again");
    setValues({ email, password, account_type: accountType });
    const res = await login();
  };

  return (
    <Box>
      <Error errors={errors} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="email" isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input name="email" placeholder="Email" ref={register} />
        </FormControl>
        <br />
        <FormControl id="password" isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            name="password"
            placeholder="Password"
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
            Login
          </Button>
        </Center>
      </form>
    </Box>
  );
};

export default LoginForm;

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!, $account_type: String!) {
    login(email: $email, password: $password, account_type: $account_type) {
      accessToken
    }
  }
`;
