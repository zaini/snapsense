import { useState, useContext } from "react";
import { Grid, Box, Center, Container } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
import AccountTypeSelector from "../components/AccountTypeSelector";
import { AuthContext } from "../context/auth";

const LoginPage = (props) => {
  const { user } = useContext(AuthContext);

  const [accountType, setAccountType] = useState("PATIENT");

  const onAccountTypeChange = (e) => {
    setAccountType(e.target.value);
  };

  if (user) {
    props.history.push("/");
  }

  return (
    <Container p="7" borderWidth="1px" borderRadius="lg" mt="20">
      <Grid
        container
        justify="center"
        direction="column"
        alignItems="center"
        textAlign="center"
      >
        <h1>Choose Account Type</h1>

        <AccountTypeSelector
          onAccountTypeChange={onAccountTypeChange}
          accountType={accountType}
        />

        <h4>
          Hello {accountType}! Please fill out the form below to get started
        </h4>

        <br />

        <LoginForm accountType={accountType} />
      </Grid>
    </Container>
  );
};

export default LoginPage;
