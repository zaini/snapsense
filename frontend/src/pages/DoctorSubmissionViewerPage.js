import { Container } from "@chakra-ui/react";
import React from "react";
import ImageUpload from "../components/ImageUpload/ImageUpload";
import Questionnaire from "../components/Questionnaire/Questionnaire.js";

const DoctorSubmissionViewerPage = () => {
  return (
    <>
      <ImageSubmission />
      <br />
      <QuestionnaireSubmission />
    </>
  );
};

export default SubmissionPage;
