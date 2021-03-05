import { useContext } from "react";
import { Redirect, Route } from "react-router";
import { AuthContext } from "../context/auth";

const PrivateRoute = ({ component, ...rest }) => {
  const { user } = useContext(AuthContext);
  console.log(user, component);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return user ? (
          component
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        );
      }}
    ></Route>
  );
};

export default PrivateRoute;
