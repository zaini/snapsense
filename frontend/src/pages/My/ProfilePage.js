import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import UserInfo from "../../components/UserInfo";
import SubmissionsComponent from "../../components/SubmissionsView/SubmissionsComponent";
import { Heading } from "@chakra-ui/react";

// Shows the information about the user who is logged in
// If they are a patient, also show their "submissions" component
const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <UserInfo />
      {user.accountType === "PATIENT" && (
        <>
          <Heading>My Submissions</Heading>
          <br />
          <SubmissionsComponent />
        </>
      )}
    </>
  );
};

export default ProfilePage;
