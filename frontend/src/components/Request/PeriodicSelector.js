import React from "react";
import {
  Center,
  FormControl,
  FormLabel,
  RadioGroup,
  HStack,
  Radio,
  Stack,
  SimpleGrid,
  Input,
  Text,
} from "@chakra-ui/react";
import InputFieldProvider from "./InputFieldProvider";

const PeriodicSelector = ({ patient, register }) => {
  return (
    <FormControl isRequired>
      <Center>
        <FormLabel as="header" textAlign="center">
          How often would you like {patient.fname} to make this submissions?
        </FormLabel>
      </Center>
      <Center>
        <RadioGroup defaultValue="3">
          <Stack>
            <InputFieldProvider
              title="Interval"
              name={"requestInterval"}
              desc="Interval in days"
              register={register}
            />
            <InputFieldProvider
              title="Frequency"
              name={"requestFrequency"}
              desc="Frequncy of Cycles"
              register={register}
            />
          </Stack>
        </RadioGroup>
      </Center>
    </FormControl>
  );
};

export default PeriodicSelector;
