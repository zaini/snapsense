import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth";

const LogoutPage = (props) => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      await logout();
      props.history.push("/");
    })();
  }, []);

  return <p>Logging you out...</p>;
};

export default LogoutPage;
