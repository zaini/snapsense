import { useState } from "react";
import {
  Button,
  Box,
  Flex,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import Question from "./Question";
import {
  ArrowForwardIcon,
  ArrowBackIcon,
  CheckCircleIcon,
} from "@chakra-ui/icons";

// Questions will come from backend
const questionsObject = [
  {
    questionID: 0,
    questionText: "In the past 7 days, have you felt unwell?",
    answerOptions: [
      { answerText: "Yes" },
      { answerText: "No" },
    ],
  },
  {
    questionID: 1,
    questionText: "In the past 7 days, have you had a fever (temperature higher than 36C)?",
    answerOptions: [
      { answerText: "Yes" },
      { answerText: "No" },
     
    ],
  },
  {
    questionID: 2,
    questionText: "In the past 7 days, have you seen redness around your ulcer?",
    answerOptions: [
      { answerText: "Yes" },
      { answerText: "No" },
    ],
  },
  {
    questionID: 3,
    questionText: "In the past 7 days, have you seen any puss around your ulcer?",
    answerOptions: [
      { answerText: "Yes" },
      { answerText: "No" },
  
    ],
  },
  {
    questionID: 4,
    questionText: "In the past 7 days, has your ulcer been hotter to touch than usual?",
    answerOptions: [
      { answerText: "Yes" },
      { answerText: "No" },
    ],
  },
  {
    questionID: 5,
    questionText: "In the past 7 days, has one foot been hotter to touch than the other?",
    answerOptions: [
      { answerText: "Yes" },
      { answerText: "No" },
    ],
  },
  {
    questionID: 6,
    questionText: "In the past 7 days, have you noticed any unusual smells from the wound?",
    answerOptions: [
      { answerText: "Yes" },
      { answerText: "No" },
    ],
  },
  {
    questionID: 7,
    questionText: "Please add any other notes for your clinician (optional):",
    answerOptions: [
      { answerText: "Yes" },
      { answerText: "No" },
      //TODO: Figure a way to add a text field for this questions instead of Y/N
    ],
  },
];

const Questionnaire = () => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [answers, setAnswers] = useState(Array(questionsObject.length));

  const onChangeOption = (optionIndex) => {
    let temp = answers;
    temp[questionNumber] = optionIndex;
    setAnswers(temp);
  };

  return (
    <Flex>
      <Stack spacing={3} w={"100%"}>
        <h1>Question Number: {questionNumber + 1}</h1>
        {questionsObject.map((e, i) => (
          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            padding="4"
            display={questionNumber === i ? "block" : "none"}
          >
            <Question
              question={questionsObject[i]}
              onChangeOption={onChangeOption}
            />
          </Box>
        ))}

        <SimpleGrid columns={[3]} spacing={2}>
          <Button
            leftIcon={<ArrowBackIcon />}
            colorScheme="teal"
            variant="solid"
            onClick={() => setQuestionNumber(questionNumber - 1)}
            disabled={questionNumber === 0}
          >
            Previous
          </Button>

          <Button
            rightIcon={<CheckCircleIcon />}
            colorScheme="teal"
            variant="solid"
            disabled={questionNumber !== questionsObject.length - 1}
            onClick={() => console.log(answers)}
          >
            Submit
          </Button>

          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="teal"
            variant="solid"
            onClick={() => setQuestionNumber(questionNumber + 1)}
            disabled={questionNumber === questionsObject.length - 1}
          >
            Next
          </Button>
        </SimpleGrid>
      </Stack>
    </Flex>
  );
};

export default Questionnaire;
