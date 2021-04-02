import React from "react";
import Typography from "@material-ui/core/Typography";
import { Box, Text, Flex, Stack, SimpleGrid, Divider } from "@chakra-ui/layout";
import Question from "./Question";

// Questions will come from backend
const questionsObject = [
  {
    questionID: 0,
    questionText: "In the past 7 days, have you felt unwell?",
    answerOptions: [{ answerText: "No" }, { answerText: "Yes" }]
  },
  {
    questionID: 1,
    questionText:
      "In the past 7 days, have you had a fever (temperature higher than 36C)?",
    answerOptions: [{ answerText: "No" }, { answerText: "Yes" }]
  },
  {
    questionID: 2,
    questionText:
      "In the past 7 days, have you seen redness around your ulcer?",
    answerOptions: [{ answerText: "No" }, { answerText: "Yes" }]
  },
  {
    questionID: 3,
    questionText:
      "In the past 7 days, have you seen any puss around your ulcer?",
    answerOptions: [{ answerText: "No" }, { answerText: "Yes" }]
  },
  {
    questionID: 4,
    questionText:
      "In the past 7 days, has your ulcer been hotter to touch than usual?",
    answerOptions: [{ answerText: "No" }, { answerText: "Yes" }]
  },
  {
    questionID: 5,
    questionText:
      "In the past 7 days, has one foot been hotter to touch than the other?",
    answerOptions: [{ answerText: "No" }, { answerText: "Yes" }]
  },
  {
    questionID: 6,
    questionText:
      "In the past 7 days, have you noticed any unusual smells from the wound?",
    answerOptions: [{ answerText: "No" }, { answerText: "Yes" }]
  },
  {
    questionID: 7,
    questionText: "Please add any other notes for your clinician (optional):",
    answerOptions: [
      { answerText: "No" },
      { answerText: "Yes" }
      //TODO: Figure a way to add a text field for this questions instead of Y/N
    ]
  }
];

const QuestionForm = ({ step, answers, setAnswers }) => {
  if (!answers.questionnaire[step + 1]) {
    answers.questionnaire[step + 1] = {};
  }
  const onChangeOption = optionIndex => {
    let temp = answers;
    temp.questionnaire[step + 1].val = optionIndex;
    setAnswers(temp);
  };

  const onChangeText = extraInfo => {
    let temp = answers;
    temp.questionnaire[step + 1].extra = extraInfo;
    setAnswers(temp);
  };
  return (
    <Box data-testid="Questionnaire">
      <Flex>
        <Stack w={"100%"} textAlign={"center"}>
          <Typography variant="h6" gutterBottom>
            Question {questionsObject[step].questionID + 1}
          </Typography>

          <Flex>
            {questionsObject.map((e, i) => (
              <Box
                borderWidth="1px"
                borderRadius="lg"
                width={"100%"}
                overflow="hidden"
                padding="4"
                display={step === i ? "block" : "none"}
                key={`Questionnaire-${i}`}
              >
                <Question
                  question={questionsObject[i]}
                  onChangeOption={onChangeOption}
                  onChangeText={onChangeText}
                />
              </Box>
            ))}
          </Flex>
        </Stack>
      </Flex>
    </Box>
  );
};

export default QuestionForm;
