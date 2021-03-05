import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../context/auth";

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useContext(AuthContext);
  console.log("You are entering a private route. User: ", user);
  console.log("Showing: ", user ? "child" : "redirect");

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return user ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        );
      }}
    ></Route>
  );
};

export default PrivateRoute;
