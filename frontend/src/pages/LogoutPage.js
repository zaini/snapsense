import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth";

const LogoutPage = () => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout();
  }, []);

  return <p>Logging you out...</p>;
};

export default LogoutPage;
