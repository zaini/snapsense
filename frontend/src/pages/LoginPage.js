import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import LoginForm from "../components/LoginForm";
import AccountTypeSelector from "../components/AccountTypeSelector";
import { AuthContext } from "../context/auth";

const LoginPage = (props) => {
  const { user } = useContext(AuthContext);

  const [accountType, setAccountType] = useState("patient");

  const onAccountTypeChange = (e) => {
    setAccountType(e.target.value);
  };

  if (user) {
    props.history.push("/");
  }

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

      <LoginForm />

      <p>
        No account? <Link to={"/login"}>Sign up</Link>
      </p>
    </Grid>
  );
};

export default LoginPage;
