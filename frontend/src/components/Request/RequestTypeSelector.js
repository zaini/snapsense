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
        <RadioGroup defaultValue="both">
          <HStack spacing="24px">
            <Radio ref={register} name="requestType" value="image">
              Image
            </Radio>
            <Radio ref={register} name="requestType" value="questionnaire">
              Questionnaire
            </Radio>
            <Radio ref={register} name="requestType" value="both">
              Both
            </Radio>
          </HStack>
        </RadioGroup>
      </Center>
    </FormControl>
  );
};

export default RequestTypeSelector;
