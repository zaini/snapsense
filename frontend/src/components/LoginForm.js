import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
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
      {errors.error && <p severity="error">{errors.error.message}</p>}
      <input
        type="text"
        placeholder="Email"
        name="email"
        ref={register({ required: true, pattern: /^\S+@\S+$/i })}
      />
      <input
        type="text"
        placeholder="Password"
        name="password"
        ref={register({ required: true, max: 18, min: 0 })}
      />

      <input type="submit" />
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
