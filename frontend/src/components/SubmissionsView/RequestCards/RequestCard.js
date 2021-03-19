import {
  Box,
  HStack,
  VStack,
  Button,
  Select,
  Text,
  InputGroup,
  InputLeftAddon,
  Input,
  Center,
} from "@chakra-ui/react";
import React from "react";
import ImageSlideshow from "../../utils/ImageSlideshow";
import ViewQuestionnaireResponse from "../../utils/ViewQuestionnaireResponse";
import RequestCardOptions from "./RequestCardOptions";

// id: "1"
// Doctor:
// email: "doctor1@nhs.net"
// fname: "Doctor"
// lname: "One"
// Patient:
// email: "patient1@gmail.com"
// fname: "Patient"
// lname: "One"
// Submission:
// Answers: null
// Images: null
// createdAt: "1609718400000"
// flag: 1
// id: "1"
// deadline: "1609804800000"
// type: 3

// This takes a request as above.
const RequestCard = ({ data }) => {
  const { Patient, Submission, deadline, type } = data;
  const deadline_date = new Date(parseInt(deadline)).toDateString();
  const submission_date = new Date(
    parseInt(Submission.createdAt)
  ).toDateString();

  console.log(Patient, Submission, deadline, type);

  return (
    <Box borderWidth="1px" borderRadius="lg" p="5px" m="5px">
      <Center>
        <HStack spacing="10%">
          {Submission.Images || true ? (
            <ImageSlideshow images={Submission.Images} />
          ) : (
            <Text>This submission has no images</Text>
          )}
          {Submission.Answers ? (
            <ViewQuestionnaireResponse answers={Submission.Answers} />
          ) : (
            <Text>This submission has no questionnaire</Text>
          )}
          <RequestCardOptions
            patient={Patient}
            submission={Submission}
            submission_date={submission_date}
            deadline_date={deadline_date}
          />
        </HStack>
      </Center>
    </Box>
  );
};

export default RequestCard;
