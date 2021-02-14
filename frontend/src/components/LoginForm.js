import React from "react";
import { Button } from "@material-ui/core";

const LoginForm = (props) => {
  return (
    <div>
      <h2>{props.name}</h2>
      <input></input>
      <input></input>
      {/* <button>click</button> */}
      <Button variant="contained">Login</Button>
    </div>
  );
};

export default LoginForm;
