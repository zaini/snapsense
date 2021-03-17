import { Heading, Stack, Text } from "@chakra-ui/layout";
import { Box } from "@material-ui/core";
import React from "react";

const questionsObject = [
  {
    questionID: 0,
    questionText: "In the past 7 days, have you felt unwell?",
    answerOptions: [{ answerText: "No" }, { answerText: "Yes" }],
  },
  {
    questionID: 1,
    questionText:
      "In the past 7 days, have you had a fever (temperature higher than 36C)?",
    answerOptions: [{ answerText: "No" }, { answerText: "Yes" }],
  },
  {
    questionID: 2,
    questionText:
      "In the past 7 days, have you seen redness around your ulcer?",
    answerOptions: [{ answerText: "No" }, { answerText: "Yes" }],
  },
  {
    questionID: 3,
    questionText:
      "In the past 7 days, have you seen any puss around your ulcer?",
    answerOptions: [{ answerText: "No" }, { answerText: "Yes" }],
  },
  {
    questionID: 4,
    questionText:
      "In the past 7 days, has your ulcer been hotter to touch than usual?",
    answerOptions: [{ answerText: "No" }, { answerText: "Yes" }],
  },
  {
    questionID: 5,
    questionText:
      "In the past 7 days, has one foot been hotter to touch than the other?",
    answerOptions: [{ answerText: "No" }, { answerText: "Yes" }],
  },
  {
    questionID: 6,
    questionText:
      "In the past 7 days, have you noticed any unusual smells from the wound?",
    answerOptions: [{ answerText: "No" }, { answerText: "Yes" }],
  },
  {
    questionID: 7,
    questionText: "Please add any other notes for your clinician (optional):",
    answerOptions: [
      { answerText: "No" },
      { answerText: "Yes" },
      //TODO: Figure a way to add a text field for this questions instead of Y/N
    ],
  },
];
const answerOption = ["No", "Yes"];

const ReviewListItem = ({ answerIndex, answer, extra }) => {
  return (
    <Box
      w={"full"}
      style={{ backgroundColor: "#edf8ff", margin:"5px"}}
      boxShadow={"2xl"}
      rounded={"md"}
      p={3}
    >
      <Stack>
        <Heading color={"gray.700"} fontSize={"2xl"} fontFamily={"body"}>
          {questionsObject[answerIndex-1].questionText}
        </Heading>
        <Text color={"gray.600"}>{answerOption[parseInt(answer)]}</Text>
        <Text color={"gray.500"}>{extra}</Text>
      </Stack>
    </Box>
  );
};

export default ReviewListItem;
