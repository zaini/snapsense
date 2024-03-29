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
        data-testid="timelineToggle"
        id="toggle"
        size="md"
        onChange={() => setViewTimeline(!viewTimeline)}
        mb="10px"
      />
      {viewTimeline ? (
        <PatientSubmissionsTimeline data={data} />
      ) : (
        <PatientSubmissionsTable data={data} />
      )}
    </>
  );
};

export default SubmissionsViewSwitch;
