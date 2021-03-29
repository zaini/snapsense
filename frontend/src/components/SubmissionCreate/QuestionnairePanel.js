import React, { useState } from "react";
import { StepLabel, Step, Paper, Stepper } from "@material-ui/core";
import { Heading, Stack, Box, Center } from "@chakra-ui/react";

import QuestionForm from "./Questionnaire";
import Review from "./Review";
import BackButton from "./BackButtton";
import NextButton from "./NextButton";

const steps = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Review"];

const QuestionnairePanel = ({
  classes,
  activeStep,
  answers,
  setAnswers,
  handleBack,
  handleNext,
}) => {
  const [reviewBtn, setReviewBtn] = useState(false);
  return (
    <Paper className={classes.paper}>
      <Heading style={{ textAlign: "center" }}>Questionnaire</Heading>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box>
        <Stack>
          <QuestionForm
            isVisible={!reviewBtn}
            step={activeStep}
            answers={answers}
            setAnswers={setAnswers}
          />

          <Review isVisible={reviewBtn} answers={answers} />

          <Center columns={[2]}>
            <BackButton
              activeStep={activeStep}
              handleBack={handleBack}
              classes={classes}
            />
            <NextButton
              activeStep={activeStep}
              handleNext={handleNext}
              classes={classes}
              setReviewBtn={setReviewBtn}
            />
          </Center>
        </Stack>
      </Box>
    </Paper>
  );
};

export default QuestionnairePanel;
