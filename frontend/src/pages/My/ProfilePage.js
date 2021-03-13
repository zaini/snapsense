import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import UserInfo from "../../components/UserInfo";

// Shows the information about the user who is logged in
// If they are a patient, also show their "submissions" component
const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <UserInfo />
      {user.accountType === "PATIENT" ? (
        <p>submissions component goes here</p>
      ) : null}
    </>
  );
};

export default ProfilePage;
