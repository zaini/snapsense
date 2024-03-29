import React from "react";
import Typography from "@material-ui/core/Typography";
import { Box, Flex, Stack } from "@chakra-ui/layout";
import Question from "./Question";
import questionsObject from "../../utils/QuestionsObject";

const QuestionForm = ({
  step,
  answers,
  setAnswers,
  isQuestionnaireVisible,
}) => {
  if (!answers.questionnaire[step + 1]) {
    answers.questionnaire[step + 1] = {};
  }
  const onChangeOption = (optionIndex) => {
    let temp = answers;
    temp.questionnaire[step + 1].val = optionIndex;
    setAnswers(temp);
  };

  const onChangeText = (extraInfo) => {
    let temp = answers;
    temp.questionnaire[step + 1].extra = extraInfo;
    setAnswers(temp);
  };
  return (
    <Box data-testid="questionMaster">
      <Flex>
        <Stack w={"100%"} textAlign={"center"}>
          <Typography variant="h6" gutterBottom>
            Question {questionsObject[step].questionID + 1}
          </Typography>

          <Flex>
            {questionsObject.map((e, i) => (
              <Box
                key={i}
                borderWidth="1px"
                borderRadius="lg"
                width={"100%"}
                overflow="hidden"
                padding="4"
                hidden={!isQuestionnaireVisible}
                display={step === i ? "block" : "none"}
                data-testid={`Questionnaire${i + 1}`}
              >
                <Question
                  step={i}
                  isHidden={!isQuestionnaireVisible}
                  answers={answers}
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
