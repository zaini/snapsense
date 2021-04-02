import React, { useState } from "react";
import { StepLabel, Step, Paper, Stepper } from "@material-ui/core";
import { Heading, Stack, Box, Center } from "@chakra-ui/react";

import QuestionForm from "./Questionnaire";
import Review from "./Review";
import BackButton from "./BackButton";
import NextButton from "./NextButton";

const steps = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Review"];

const QuestionnairePanel = ({
  isQuestionnaireVisible,
  classes,
  activeStep,
  answers,
  setAnswers,
  handleBack,
  handleNext
}) => {
  console.log(isQuestionnaireVisible)
  console.log(activeStep);
  return (
    <Paper className={classes.paper}>
      <Heading style={{ textAlign: "center" }}>Questionnaire</Heading>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map(label => (
          <Step key={label} className="QuestionnaireSteps">
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box>
        <Stack>
          {isQuestionnaireVisible ? (
            <QuestionForm
              step={activeStep}
              answers={answers}
              setAnswers={setAnswers}
            />
          ) : (
            <Review answers={answers} />
          )}

          <Center columns={[2]}>
            {activeStep > 0 ? (
              <BackButton
                activeStep={activeStep}
                handleBack={handleBack}
                classes={classes}
              />
            ) : (
              <BackButton
                activeStep={activeStep}
                handleBack={handleBack}
                classes={classes}
                disabled
              />
            )}
            {activeStep < 7 && (
              <NextButton handleNext={handleNext} classes={classes.button} />
            )}
            {activeStep === 7 && (
              <NextButton
                name="Review"
                handleNext={handleNext}
                classes={classes.button}
              />
            )}
          </Center>
        </Stack>
      </Box>
    </Paper>
  );
};

export default QuestionnairePanel;
