import React from "react";
import { Center, FormControl, FormLabel } from "@chakra-ui/react";

import FormDate from "../utils/FormDate";

const RequestDatePicker = ({ control }) => {
  return (
    <FormControl isRequired marginTop="10" marginBottom="5">
      <Center>
        <FormLabel as="header" justifyContent="center">
          Submission Deadline:
        </FormLabel>
      </Center>
      <Center>
        <FormDate control={control} />
      </Center>
    </FormControl>
  );
};

export default RequestDatePicker;
