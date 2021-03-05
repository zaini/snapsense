import React from "react";
import UserInfo from "../../components/incomplete/UserInfo";

const Profile = () => {
  return (
    <>
      <UserInfo
        firstName="first name"
        lastName="last name"
        email="aaa@email.com"
        password="password"
      />
    </>
  );
};

export default Profile;
