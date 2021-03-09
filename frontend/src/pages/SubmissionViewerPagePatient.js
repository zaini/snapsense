import { Container } from "@chakra-ui/react";
import React from "react";
import ImageSubmission from "../components/ImageSubmission.js";

const SubmissionViewerPagePatient = () => {
  return (
    <div>
    
    <Container>
    <br/>
    <h1>Viewing my submission</h1>
    <br/>
    <hr/>
    <h2>Photos</h2>
    <br/>
    <ImageSubmission />
    <br />
    <hr/>
    <h2>Questionnaire</h2>
    <br/>

      
      {/* <QuestionnaireSubmission />
      <br />  */}
      
      </Container>
    </div>
  );
};

export default SubmissionViewerPagePatient;
