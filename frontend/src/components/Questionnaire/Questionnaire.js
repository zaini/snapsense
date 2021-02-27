import React, { Component } from 'react';
import quizQuestions from '../../api/quizQuestions';
import {Button} from "@chakra-ui/react";
import {ArrowForwardIcon, ArrowBackIcon} from '@chakra-ui/icons';
import Quiz from './QuestionBox';


class Questionnaire extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: "",
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.onButtonNext = this.onButtonNext.bind(this);
    this.onButtonBack = this.onButtonBack.bind(this);
  }

  componentDidMount() {
    const answerOptions = quizQuestions.map(question =>
      question.answers
    );
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: answerOptions[0],
      
    });
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);
  }

  onButtonNext() {
    if (this.state.questionId < quizQuestions.length) {
       this.setNextQuestion();
    } 
  }

  onButtonBack() {
    const counter = this.state.counter - 1;
    const questionId = this.state.questionId - 1;

    if (this.state.questionId !== 1) {
      this.setState({
        counter: counter,
        questionId: questionId,
        question: quizQuestions[counter].question,
        answerOptions: quizQuestions[counter].answers,
      })
   } 
  }

  setUserAnswer(answer) {
    this.setState({
      answer: answer
    })
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: ""
    });
  }


  render() {
    return (
      <div className="App">
        <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
        onButtonBack={this.onButtonBack}
        onButtonNext={this.onButtonNext}
        />
        <br/>
        <center>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{width:'500px', height:'auto'}}>
          <Button onClick={this.onButtonBack} leftIcon={<ArrowBackIcon />} colorScheme = "blue" >Back</Button>
          <Button onClick={this.onButtonNext} rightIcon={<ArrowForwardIcon />}>Next</Button>
          <Button >Submit</Button>
        </div>
        </div>
        </center>
        <Button colorScheme="green">Button</Button>

      </div>
      
      
    );
  }
}

export default Questionnaire;