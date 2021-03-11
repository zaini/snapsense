import React from "react";
import UserInfo from "../../components/incomplete/UserInfo";
import PatientsPersonalLogPage from "./PatientsPersonalLogPage";

const Profile = () => {
  return (
    <>
      <UserInfo
        firstName="first name"
        lastName="last name"
        email="aaa@email.com"
        password="password"
      />
      <PatientsPersonalLogPage />
    </>
  );
};

export default Profile;
