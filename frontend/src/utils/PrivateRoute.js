import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../context/auth";

const PrivateRoute = ({ accountTypes, children, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          if (accountTypes.includes(user.accountType)) {
            return children;
          } else {
            return <Redirect to={"/error"} />;
          }
        } else {
          return (
            <Redirect to={{ pathname: "/login", state: { from: location } }} />
          );
        }
      }}
    />
  );
};

export default PrivateRoute;
