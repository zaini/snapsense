import React from "react";
import { Center, FormControl, FormLabel, Stack } from "@chakra-ui/react";
import InputFieldProvider from "./InputFieldProvider";

const PeriodicSelector = ({ patient, register, show }) => {
  let masterStyle;
  if (!show) {
    masterStyle = {
      display: "none",
    };
  } else {
    masterStyle = {};
  }
  return (
    <FormControl {...masterStyle} isRequired>
      <Center>
        <FormLabel as="header" textAlign="center">
          How often would you like {patient.fname} to make this submissions?
        </FormLabel>
      </Center>
      <Center>
        <Stack>
          <InputFieldProvider
            testName={"inputInterval"}
            title="Interval"
            name={"requestInterval"}
            desc="Interval in days"
            register={register}
          />
          <InputFieldProvider
            testName="inputFrequency"
            title="Frequency"
            name={"requestFrequency"}
            desc="Frequency of Cycles"
            register={register}
          />
        </Stack>
      </Center>
    </FormControl>
  );
};

export default PeriodicSelector;
