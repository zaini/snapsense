import React from "react";
import UserInfo from "../../components/incomplete/UserInfo";
import PatientsPersonalLogPage from "./PatientsPersonalLogPage";

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
      <PatientsPersonalLogPage />
    </>
  );
};

export default PatientProfilePage;
