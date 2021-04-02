import React from "react";
import { Button, Paper } from "@material-ui/core";
import { Center } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

const SubmitButtonPanel = ({ answers, images, classes, uploadSubmission }) => {
  // Check what all content has been uploaded
  const imageUploadExists = images.length > 0;
  const answerUploadExists = Object.keys(answers.questionnaire).length > 1;
  let validateAnswers = true;
  if (answerUploadExists) {
    for (const questionId in answers.questionnaire) {
      if (questionId < 9) {
        if (!answers.questionnaire[questionId].val) {
          validateAnswers = false;
        }
      }
    }
  }

  return (
    <Paper className={classes.paper}>
      <Center>
        <Button
          data-testid="submitButton"
          disabled={
            !imageUploadExists && !(answerUploadExists && validateAnswers)
          }
          rightIcon={<CheckCircleIcon />}
          variant="contained"
          color="primary"
          colorScheme="blue"
          onClick={() => {
            uploadSubmission({
              variables: {
                images,
                answers: JSON.stringify(answers)
              }
            });
          }}
        >
          Submit
        </Button>
      </Center>
    </Paper>
  );
};

export default SubmitButtonPanel;
