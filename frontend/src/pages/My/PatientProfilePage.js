import React from "react";
import UserInfo from "../../components/UserInfo";

// Shows the information about a specific patient and also their submissions
const PatientProfilePage = () => {
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

export default PatientProfilePage;
