import { useState } from "react";
import { Link } from "react-router-dom";
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

      <h4>
        Hello {accountType}! Please fill out the form below to get started
      </h4>

      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />

      <p>
        No account? <Link to={"/login"}>Sign up</Link>
      </p>
    </Grid>
  );
};

export default LoginPage;
