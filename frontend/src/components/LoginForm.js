import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Error from "../components/Error";
import { Button, Input, InputAdornment } from "@material-ui/core";
import { MailOutline, LockOutlined } from "@material-ui/icons";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { AuthContext } from "../context/auth";

const LoginForm = (props) => {
  const history = useHistory();
  const context = useContext(AuthContext);
  const [values, setValues] = useState({});

  const { register, handleSubmit, setError, errors } = useForm();

  const [login, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      history.push("/");
    },
    onError(err) {
      setError("error", { message: err.graphQLErrors[0].message });
    },
    variables: values,
  });

  const onSubmit = ({ email, password }) => {
    setValues({ email, password, account_type: "ADMIN" });
    login();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Error errors={errors} />
      <br />
      <Input
        type="text"
        placeholder="Email"
        name="Email"
        ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        startAdornment={
          <InputAdornment position="start">
            <MailOutline />
          </InputAdornment>
        }
      />
      <br />
      <br />
      <Input
        type="password"
        placeholder="Password"
        name="Password"
        ref={register({ required: true })}
        startAdornment={
          <InputAdornment position="start">
            <LockOutlined />
          </InputAdornment>
        }
      />
      <br />
      <br />
      <Button name="submit" variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
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
