import { Select, Container } from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";
import { useState } from "react";

const SubmissionViewerPageDoctor = () => {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <Container>
        <br />
        <h1>Viewing Patient x's submission</h1>
        <br />
        <hr />
        <h2>Photos</h2>
        <br />
        <hr />
        <h2>Questionnaire</h2>
        <br />

        {/* <ImageSubmission />
      <br />
      <QuestionnaireSubmission />
      <br />  */}

        <Select
          size="lg"
          icon={<WarningTwoIcon />}
          variant="outline"
          placeholder="Select a triage option"
          onChange={handleChange}
          value={value}
        >
          <option value="high">High risk</option>
          <option value="medium">Medium risk</option>
          <option value="low">Low risk</option>
        </Select>
      </Container>
    </div>
  );
};

export default SubmissionViewerPageDoctor;