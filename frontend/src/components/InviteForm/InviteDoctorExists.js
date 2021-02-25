import React from "react";
import { Box } from "@chakra-ui/react";

const InviteDoctorExists = () => {
  return (
    <Box p="7" borderWidth="1px" borderRadius="lg">
      <h1>
        You already have a SnapSense account and so cannot accept another
        request to join. You must delete you current account to join another
        clinic.
      </h1>
    </Box>
  );
};

export default InviteDoctorExists;
