import React from "react";
import SubmissionsComponent from "../../components/SubmissionsView/SubmissionsComponent";
import PatientInfo from "../../components/PatientInfo";

// Shows the information about a specific patient and also their submissions
// used by doctors. similar to profilepage for patients
const PatientProfilePage = () => {
  return (
    <>
      <div data-testid="patientProfileContainer">
        <PatientInfo />
      </div>
      <div data-testid="patientSubmissionContainer">
        <SubmissionsComponent />
      </div>
    </>
  );
};

export default PatientProfilePage;
