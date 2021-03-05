import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../context/auth";

const PrivateRoute = ({ accountTypes, children, ...rest }) => {
  const { user } = useContext(AuthContext);
  console.log("You are entering a private route. User: ", user);
  console.log("Showing: ", user ? "child" : "redirect");

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          if (accountTypes.includes(user.accountType)) {
            return children;
          } else {
            // TODO: redirect to error page
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
