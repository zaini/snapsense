import { useState } from "react";
import { Switch, FormLabel } from "@chakra-ui/react";
import PatientSubmissionsTimeline from "./PatientSubmissionsTimeline";
import PatientSubmissionsTable from "./PatientSubmissionsTable";

const SubmissionsViewSwitch = ({ data }) => {
  const [viewTimeline, setViewTimeline] = useState(false);

  return (
    <>
      <FormLabel htmlFor="toggle" mb="10px">
        Enable timeline view?
      </FormLabel>
      <Switch
        id="toggle"
        size="md"
        onChange={() => setViewTimeline(!viewTimeline)}
        mb="10px"
      />
      {viewTimeline ? (
        <PatientSubmissionsTimeline data-testid="patientSubmissionTable" data={data} />
      ) : (
        <PatientSubmissionsTable data-testid="patientSubmissionTable" data={data} />
      )}
    </>
  );
};

export default SubmissionsViewSwitch;
