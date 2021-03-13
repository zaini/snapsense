import React from "react";
import {
  Center,
  FormControl,
  FormLabel,
  RadioGroup,
  HStack,
  Radio,
} from "@chakra-ui/react";

const RequestTypeSelector = ({ patient, register }) => {
  return (
    <FormControl isRequired>
      <Center>
        <FormLabel as="header" textAlign="center">
          Ask {patient.name} to upload a picture, questionnaire or both
        </FormLabel>
      </Center>
      <Center>
        <RadioGroup defaultValue="3">
          <HStack spacing="24px">
            <Radio ref={register} name="requestType" value="1">
              Image
            </Radio>
            <Radio ref={register} name="requestType" value="2">
              Questionnaire
            </Radio>
            <Radio ref={register} name="requestType" value="3">
              Both
            </Radio>
          </HStack>
        </RadioGroup>
      </Center>
    </FormControl>
  );
};

export default RequestTypeSelector;
