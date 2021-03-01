import React, { useState } from "react";
import { Button } from "@material-ui/core";
import "./Questionnaire.css";

// Questions will come from backend
const questions = [
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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState([-1, -1, -1, -1]);
  // answer[currentQuestion] = index
  //const [answers, setAnswers] = useState();

  const handleAnswerOptionClick = (event) => {
    let temp = answer;
    temp[currentQuestion] = parseInt(event.target.getAttribute("index"));
    setAnswer(temp);
    console.log(
      "You have selected number ",
      parseInt(event.target.getAttribute("index"))
    );
  };

  const onClickNext = () => {
    const nextQuestion = currentQuestion + 1;
    nextQuestion < questions.length
      ? setCurrentQuestion(nextQuestion)
      : console.log("The end");
  };

  const onClickBack = () => {
    const prevQuestion = currentQuestion - 1;
    prevQuestion >= 0
      ? setCurrentQuestion(prevQuestion)
      : console.log("This is the beginning");
  };

  const onClickSubmit = () => {
    alert("Thanks for submitting");
  };

  return (
    <div>
      <div className="questionnaire center ma4">
        <div className="question-section">
          <div className="question-count">
            <span>Question {currentQuestion + 1}</span>/{questions.length}
          </div>
          <div className="question-text">
            {questions[currentQuestion].questionText}
          </div>
        </div>
        <div className="answer-section">
          {questions[currentQuestion].answerOptions.map((answerOption, i) => (
            <div className="form-check" key={i}>
              <label>
                <input
                  key={i}
                  index={i}
                  type="radio"
                  name="options"
                  onChange={(e) => handleAnswerOptionClick(e)}
                  checked={
                    answer[currentQuestion] && answer[currentQuestion] === i
                  }
                />
                {answerOption.answerText} {answer[currentQuestion]} =? {i}
              </label>
            </div>
          ))}
        </div>
        {answer.map((el) => (
          <p>, {el}, </p>
        ))}
      </div>
      <br />
      <div className="center">
        <div className="form center pa4 br4 shadow-3">
          <Button onClick={onClickBack}> Back </Button>
          <Button style={{ marginRight: "90px" }} onClick={onClickNext}>
            {" "}
            Next{" "}
          </Button>
          <Button onClick={onClickSubmit}> Submit </Button>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
