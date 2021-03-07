import { Select, Container} from "@chakra-ui/react";
import { WarningTwoIcon } from '@chakra-ui/icons'

import React from "react";
import ImageUpload from "../components/ImageUpload/ImageUpload";
import Questionnaire from "../components/Questionnaire/Questionnaire.js";

const SubmissionViewerPageDoctor = () => {
  return (
    <>
    <Container>
      {/* <ImageSubmission />
      <br />
      <QuestionnaireSubmission />
      <br />  */}
      
      <Select size="lg" icon={<WarningTwoIcon />} placeholder="Select a triage option">
        <option value="high">High risk</option>
        <option value="medium">Medium risk</option>
        <option value="low">Low risk</option>
      </Select>
      </Container>
    </>
  );
};

export default SubmissionViewerPageDoctor;
