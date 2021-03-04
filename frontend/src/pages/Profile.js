import React from "react";
import UserInfo from "../components/UserInfo.js";

const Profile = () => {
  return (
    <div>
      <UserInfo firstName="first name" lastName="last name" email="aaa@email.com" password = "password"></UserInfo>
    </div>
  );
};

export default Profile;
