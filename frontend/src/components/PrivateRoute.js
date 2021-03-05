import { useContext } from "react";
import { Redirect, Route } from "react-router";
import { AuthContext } from "../context/auth";

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useContext(AuthContext);

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
