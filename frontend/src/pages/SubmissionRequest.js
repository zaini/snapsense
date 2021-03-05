import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import {
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  RadioGroup,
  HStack,
  Radio,
} from "@chakra-ui/react";

const SubmissionRequest = () => {
  const { register, handleSubmit, control } = useForm();

  const onSubmit = ({ requestType }) => {
    console.log(requestType);
  };

  const patient = {
    name: "abh",
  };

  return (
    <Container p="7" borderWidth="1px" borderRadius="lg" mt="20">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired>
          <Center>
            <FormLabel as="header" justifyContent="center">
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
        <Center>
          <Button type="submit" mt={4} colorScheme="blue">
            Submit
          </Button>
        </Center>
      </form>
    </Container>
  );
};

export default SubmissionRequest;
