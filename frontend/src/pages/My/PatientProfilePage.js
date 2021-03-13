import React from "react";
import { useParams } from "react-router-dom";
import SubmissionsComponent from "../../components/incomplete/SubmissionsComponent";

// Shows the information about a specific patient and also their submissions history
const PatientProfilePage = () => {
  // Get the submission id from the url params
  const params = useParams();
  const patient_id = params.patient_id;

  //is it ok to hardcode it? since this page will only be used by doctors
  //does this page needs to be wraped in a markup?
  //add patient's profile info component above submissions component
  return (
    <div>
      <SubmissionsComponent account_type={"DOCTOR"} patient_id={patient_id} />
    </div>
  );
};

export default PatientProfilePage;
