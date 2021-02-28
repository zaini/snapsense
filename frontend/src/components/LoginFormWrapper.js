import { useState } from "react";
import { Grid, Container } from "@chakra-ui/react";
import LoginForm from "./LoginForm";
import AccountTypeSelector from "./AccountTypeSelector";

const LoginFormWrapper = ({ redirect }) => {
  const [accountType, setAccountType] = useState("PATIENT");

  const onAccountTypeChange = (e) => {
    setAccountType(e.target.value);
  };

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

        <LoginForm accountType={accountType} redirect={redirect} />
      </Grid>
    </Container>
  );
};

export default LoginFormWrapper;
