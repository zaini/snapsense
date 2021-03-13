import React from "react";
import PatientInfo from "../../components/PatientInfo";

// Shows the information about a specific patient and also their submissions
// used by doctors. similar to profilepage for patients
const PatientProfilePage = () => {
  return (
    <>
      <PatientInfo />
      <p>patient submissions component goes here go here</p>
    </>
  );
};

export default PatientProfilePage;
