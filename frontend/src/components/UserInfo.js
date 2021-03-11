import { useContext } from "react";
import { AuthContext } from "../context/auth";

const UserInfo = () => {
  const { user } = useContext(AuthContext);

  return <p></p>;
};

export default UserInfo;
