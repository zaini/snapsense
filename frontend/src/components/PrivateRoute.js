import { useContext } from "react";
import { Redirect, Route } from "react-router";
import { AuthContext } from "../context/auth";

const PrivateRoute = ({ component, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={() => {
        return user ? component : <Redirect to="/login" />;
      }}
    ></Route>
  );
};

export default PrivateRoute;
