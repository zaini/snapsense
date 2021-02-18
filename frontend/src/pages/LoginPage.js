import { useState } from "react";
import { Grid } from "@material-ui/core";
import LoginForm from "../components/LoginForm";
import AccountTypeSelector from "../components/AccountTypeSelector";

const LoginPage = () => {
  const [accountType, setAccountType] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onAccountTypeChange = (e) => {
    setAccountType(e.target.value);
  };

  return (
    <Grid container justify="center" direction="column" alignItems="center">
      <h1>Choose Account Type</h1>

      <AccountTypeSelector
        onAccountTypeChange={onAccountTypeChange}
        accountType={accountType}
      />

      <p>Hello {accountType}! Please fill out the form below to get started</p>

      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />

      <p>No account? Signup</p>
    </Grid>
  );
};

export default LoginPage;
