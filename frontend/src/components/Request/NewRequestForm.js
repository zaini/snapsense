import React from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Container,
  Center,
  FormControl,
  FormLabel,
  RadioGroup,
  HStack,
  Radio,
} from "@chakra-ui/react";

import RequestTypeSelector from "./RequestTypeSelector";
import RequestDatePicker from "./RequestDatePicker";

const NewRequestForm = ({ patient }) => {
  const { register, handleSubmit, control } = useForm();

  const onSubmit = ({ requestType, submissionDate }) => {
    console.log(+new Date(submissionDate));
    console.log(requestType);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RequestTypeSelector patient={patient} register={register} />
      <RequestDatePicker control={control} />
      <Center>
        <Button type="submit" mt={4} colorScheme="blue">
          Submit
        </Button>
      </Center>
    </form>
  );
};

export default NewRequestForm;
