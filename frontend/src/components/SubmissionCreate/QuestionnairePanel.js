import React, { useState } from "react";
import { StepLabel, Step, Paper, Stepper } from "@material-ui/core";
import { Heading, Stack, Box, Center } from "@chakra-ui/react";

import QuestionForm from "./Questionnaire";
import BackButton from "./BackButton";
import NextButton from "./NextButton";
import Review from "./Review";

const steps = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Review"];

const QuestionnairePanel = ({
  isQuestionnaireVisible,
  classes,
  activeStep,
  answers,
  setAnswers,
  handleBack,
  handleNext,
}) => {
  return (
    <Paper className={classes.paper}>
      <Heading data-testid="questionHeading" style={{ textAlign: "center" }}>
        Questionnaire
      </Heading>
      <Stepper
        data-testid="stepperHolder"
        activeStep={activeStep}
        className={classes.stepper}
      >
        {steps.map((label) => (
          <Step
            data-testid={`stepperInnerHolder${label}`}
            key={label}
            className="QuestionnaireSteps"
          >
            <StepLabel data-testid={`stepperLabel${label}`}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box>
        <Stack>
          <QuestionForm
            isQuestionnaireVisible={isQuestionnaireVisible}
            step={activeStep}
            answers={answers}
            setAnswers={setAnswers}
          />
          <Review isHidden={isQuestionnaireVisible} answers={answers} />

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
              <NextButton
                handleNext={handleNext}
                name="Next"
                classes={classes.button}
              />
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
