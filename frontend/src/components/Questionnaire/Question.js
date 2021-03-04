import React from "react";
import Options from "./Options";

const Question = ({ question, onChangeOption }) => {
  return (
    <>
      {question.questionText}
      <Options
        options={question.answerOptions}
        onChangeOption={onChangeOption}
      />
    </>
  );
};

export default Question;
