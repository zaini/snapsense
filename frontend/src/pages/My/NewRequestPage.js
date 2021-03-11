import React from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Heading,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  RadioGroup,
  HStack,
  Radio,
} from "@chakra-ui/react";

// Form for creating a new request for patients
const NewRequestPage = () => {
  const { register, handleSubmit, control } = useForm();

  const onSubmit = ({ requestType, submissionDate }) => {
    console.log(+new Date(submissionDate));
    console.log(requestType);
  };

  const patient = {
    name: "Sick Patient",
  };

  return (
    <>
      <Heading textAlign="center">
        Submission Request for {patient.name}
      </Heading>
      <Container p="7" borderWidth="1px" borderRadius="lg" mt="20">
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  <Radio
                    ref={register}
                    name="requestType"
                    value="questionnaire"
                  >
                    Questionnaire
                  </Radio>
                  <Radio ref={register} name="requestType" value="both">
                    Both
                  </Radio>
                </HStack>
              </RadioGroup>
            </Center>
          </FormControl>
          <FormControl isRequired marginTop="10" marginBottom="5">
            <Center>
              <FormLabel as="header" justifyContent="center">
                Submission Deadline:
              </FormLabel>
            </Center>
            <Center>
              <Controller
                defaultValue={Date.now()}
                name="submissionDate"
                control={control}
                render={({ onChange, value, ref }) => (
                  <DatePicker
                    selected={value}
                    onChange={onChange}
                    inputRef={ref}
                    minDate={Date.now()}
                    inline
                    showTimeInput
                  />
                )}
              />
            </Center>
          </FormControl>
          <Center>
            <Button type="submit" mt={4} colorScheme="blue">
              Submit
            </Button>
          </Center>
        </form>
      </Container>
    </>
  );
};

export default NewRequestPage;
