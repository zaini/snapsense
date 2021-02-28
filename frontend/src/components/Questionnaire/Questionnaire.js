import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import './Questionnaire.css';

export default function Questionnaire() {
	const questions = [
		{
			questionID: 1,
			questionText: 'What is the capital of France?',
			answerOptions: [
				{ answerText: 'New York'},
				{ answerText: 'London'},
				{ answerText: 'Paris'},
				{ answerText: 'Dublin'},
			],
		},
		{
			questionID: 2,
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answerText: 'Jeff Bezos'},
				{ answerText: 'Elon Musk'},
				{ answerText: 'Bill Gates'},
				{ answerText: 'Tony Stark'},
			],
		},
		{
			questionID: 3,
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: 'Apple'},
				{ answerText: 'Intel'},
				{ answerText: 'Amazon'},
				{ answerText: 'Microsoft'},
			],
		},
		{
			questionID: 4,
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1'},
				{ answerText: '4'},
				{ answerText: '6'},
				{ answerText: '7'},
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [answer, setAnswer] = useState("");
	

	const handleAnswerOptionClick = (event) => {
		setAnswer(event.target.value)
	};

	const onClickNext = () => {
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			console.log("The end");
		}
	}

	const onClickBack = () => {
		const prevQuestion = currentQuestion - 1;
		if (prevQuestion >= 0) {
			setCurrentQuestion(prevQuestion);
		}else{
			console.log("This is the beginning")
		}
	}

	const onClickSubmit = () => {
		alert("Thanks for submitting")
	}

	return (
    <div>
      <div className='questionnaire center ma4'>
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className='question-text'>{questions[currentQuestion].questionText}</div>
          </div>
          <div className='answer-section'>
            {questions[currentQuestion].answerOptions.map((answerOption, i) => (
              <div className="form-check" key={i} >	
                <label>
                <input
                  type="radio"
                  name="options"
                  onChange={handleAnswerOptionClick}
                />
                {answerOption.answerText}
                </label>
              </div>
            ))}
          </div>
      </div>
	  <br/>
      <div className='center'>
        <div className='form center pa4 br4 shadow-3'>
			<Button onClick={onClickBack}> Back </Button>
			<Button style={{marginRight:'90px'}} onClick={onClickNext}> Next </Button>
			<Button onClick={onClickSubmit}> Submit </Button>
	  	</div>
	  </div>
    </div>
	);
}