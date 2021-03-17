import { useState } from "react";
import { Switch, FormLabel } from "@chakra-ui/react";
import PatientSubmissionsTimeline from "./PatientSubmissionsTimeline";
import PatientSubmissionsTable from "./PatientSubmissionsTable";

const SubmissionsViewSwitch = ({ data }) => {
  const [viewTimeline, setViewTimeline] = useState(false);

  return (
    <>
      <FormLabel htmlFor="toggle" mb="0">
        Enable timeline view?
      </FormLabel>
      <Switch
        id="toggle"
        size="md"
        onChange={() => setViewTimeline(!viewTimeline)}
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
