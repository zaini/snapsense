import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  StepLabel,
  Step,
  Paper,
  Stepper,
  Typography,
} from "@material-ui/core";
import { Heading, SimpleGrid, Stack, Box } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

import QuestionForm from "../../components/SubmissionCreate/Questionnaire";
import Review from "../../components/SubmissionCreate/Review";
import ImageUpload from "../../components/SubmissionCreate/ImageUpload";

const useStyles = makeStyles((theme) => ({
  layout: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
    overflowY: "visible",
    [theme.breakpoints.down(1000 + theme.spacing(3) * 2)]: {
      display: "none",
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Review"];

const NewSubmissionPage = () => {
  const [images, setImages] = useState([]);
  const [answers, setAnswers] = useState({ questionnaire: {} });
  const [activeStep, setActiveStep] = useState(0);
  const [uploadSubmission, { loading, error, data }] = useMutation(
    UPLOAD_SUBMISSION
  );
  const classes = useStyles();

  const handleNext = () => {
    const temp = activeStep + 1;
    setActiveStep(temp);
  };
  const handleBack = () => {
    const temp = activeStep - 1;
    setActiveStep(temp);
  };

  return (
    <Box className={classes.layout}>
      <Stack>
        <Paper className={classes.paper}>
          <Heading style={{ textAlign: "center" }}>Image Upload</Heading>
          <ImageUpload setImages={setImages} />
        </Paper>

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
            {activeStep === steps.length ? (
              <Stack>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </Stack>
            ) : (
              <Stack>
                {activeStep < 8 ? (
                  <QuestionForm
                    step={activeStep}
                    answers={answers}
                    setAnswers={setAnswers}
                  />
                ) : (
                  <Review answers={answers} />
                )}
                <SimpleGrid columns={[2]}>
                  {activeStep === 0 ? (
                    <Button
                      variant="contained"
                      disabled
                      color="secondary"
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                  )}
                  {activeStep === 8 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      disabled
                      className={classes.button}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Next
                    </Button>
                  )}
                </SimpleGrid>
              </Stack>
            )}
          </Box>
        </Paper>
        <Paper className={classes.paper}>
          <SimpleGrid columns={[1]}>
            <Button
              rightIcon={<CheckCircleIcon />}
              variant="contained"
              color="primary"
              colorScheme="teal"
              onClick={() => {
                uploadSubmission({
                  variables: {
                    images,
                    answers: JSON.stringify(answers),
                  },
                });
              }}
            >
              Submit
            </Button>
          </SimpleGrid>
        </Paper>
      </Stack>
    </Box>
  );
};

export default NewSubmissionPage;

const UPLOAD_SUBMISSION = gql`
  mutation createSubmission($images: [Upload!], $answers: String!) {
    createSubmission(images: $images, answers: $answers)
  }
`;
