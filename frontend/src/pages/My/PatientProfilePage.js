import React from "react";
import SubmissionsComponent from "../../components/incomplete/SubmissionsComponent";
import PatientInfo from "../../components/PatientInfo";

// Shows the information about a specific patient and also their submissions
// used by doctors. similar to profilepage for patients
const PatientProfilePage = () => {
  return (
    <>
      <PatientInfo />
      <SubmissionsComponent />
    </>
  );
};

export default PatientProfilePage;
