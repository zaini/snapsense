import { useState } from "react";
import { Button, Box, Container } from "@chakra-ui/react";
import Question from "./Question";

// Questions will come from backend
const questionsObject = [
  {
    questionID: 0,
    questionText: "What is the capital of France?",
    answerOptions: [
      { answerText: "New York" },
      { answerText: "London" },
      { answerText: "Paris" },
      { answerText: "Dublin" },
    ],
  },
  {
    questionID: 1,
    questionText: "Who is CEO of Tesla?",
    answerOptions: [
      { answerText: "Jeff Bezos" },
      { answerText: "Elon Musk" },
      { answerText: "Bill Gates" },
      { answerText: "Tony Stark" },
    ],
  },
  {
    questionID: 2,
    questionText: "The iPhone was created by which company?",
    answerOptions: [
      { answerText: "Apple" },
      { answerText: "Intel" },
      { answerText: "Amazon" },
      { answerText: "Microsoft" },
    ],
  },
  {
    questionID: 3,
    questionText: "How many Harry Potter books are there?",
    answerOptions: [
      { answerText: "1" },
      { answerText: "4" },
      { answerText: "6" },
      { answerText: "7" },
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
    <Container>
      <h1>Question Number: {questionNumber + 1}</h1>
      {questionsObject.map((e, i) => (
        <Box display={questionNumber === i ? "block" : "none"}>
          <Question
            question={questionsObject[i]}
            onChangeOption={onChangeOption}
          />
        </Box>
      ))}
      <Button
        onClick={() => setQuestionNumber(questionNumber - 1)}
        disabled={questionNumber === 0}
      >
        Prev
      </Button>
      <Button
        onClick={() => setQuestionNumber(questionNumber + 1)}
        disabled={questionNumber === questionsObject.length - 1}
      >
        Next
      </Button>
      <br />
      <Button onClick={() => console.log(answers)}>Submit</Button>
    </Container>
  );
};

export default Questionnaire;
