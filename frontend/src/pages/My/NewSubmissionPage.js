import React from "react";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import { Button, StepLabel, Step, Paper, Stepper } from "@material-ui/core";
import {
  Heading,
  Stack,
  Box,
  Center,
  Text,
  Alert,
  Spinner,
  AlertIcon,
} from "@chakra-ui/react";
import { CheckCircleIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import QuestionForm from "../../components/SubmissionCreate/Questionnaire";
import Review from "../../components/SubmissionCreate/Review";
import ImageUpload from "../../components/SubmissionCreate/ImageUpload";
import BackButton from "../../components/SubmissionCreate/BackButtton";
import NextButton from "../../components/SubmissionCreate/NextButton";
import Error from "../../components/utils/Error";

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

export const NewSubmissionPage = () => {
  const [images, setImages] = useState([]);
  const [answers, setAnswers] = useState({ questionnaire: {} });
  const [activeStep, setActiveStep] = useState(0);
  const [uploadSubmission, { loading, error, data }] = useMutation(
    UPLOAD_SUBMISSION,
    {
      onError(e) {},
    }
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

  let body;
  if (loading) {
    body = (
      <Center py={6}>
        <Box
          maxW={"445px"}
          w={"full"}
          bg={"white"}
          boxShadow={"2xl"}
          rounded={"md"}
          p={6}
          overflow={"hidden"}
        >
          <Stack>
            <Heading>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Heading>
            <Heading color={"gray.700"} fontSize={"2xl"} fontFamily={"body"}>
              Loading...
            </Heading>
          </Stack>
        </Box>
      </Center>
    );
  } else if (error) {
    body = (
      <Center py={6}>
        <Box
          maxW={"445px"}
          w={"full"}
          bg={"white"}
          boxShadow={"2xl"}
          rounded={"md"}
          p={6}
          overflow={"hidden"}
        >
          <Stack>
            <Heading>
              <CloseIcon />
            </Heading>
            <Text
              color={"red.500"}
              textTransform={"uppercase"}
              fontWeight={800}
              fontSize={"sm"}
              letterSpacing={1.1}
            >
              Failed :(
            </Text>
            <Heading color={"gray.700"} fontSize={"2xl"} fontFamily={"body"}>
              <Error
                errors={[
                  {
                    message: error.graphQLErrors[0].message,
                  },
                ]}
              />
            </Heading>
          </Stack>
        </Box>
      </Center>
    );
  } else if (data) {
    body = (
      <Center py={6}>
        <Box
          maxW={"445px"}
          w={"full"}
          bg={"white"}
          boxShadow={"2xl"}
          rounded={"md"}
          p={6}
          overflow={"hidden"}
        >
          <Stack>
            <Heading>
              <CheckIcon />
            </Heading>
            <Text
              color={"green.500"}
              textTransform={"uppercase"}
              fontWeight={800}
              fontSize={"sm"}
              letterSpacing={1.1}
            >
              Success
            </Text>
            <Heading color={"gray.700"} fontSize={"2xl"} fontFamily={"body"}>
              Form has been submitted !
            </Heading>
          </Stack>
        </Box>
      </Center>
    );
  } else {
    body = (
      <Box className={classes.layout}>
        <Stack>
          <Alert data-testid="alert" status="info">
            <AlertIcon />
            Open the tabs to add your images or questionnaire or both!
          </Alert>
          <Tabs>
            <TabList>
              <Tab >Image</Tab>
              <Tab>Questionnaire</Tab>
            </TabList>
            <TabPanel>
              <Paper className={classes.paper}>
                <Heading style={{ textAlign: "center" }} data-testid="uploadHeader">Image Upload</Heading>
                <ImageUpload data-testid="imageUpload" setImages={setImages} />
              </Paper>
            </TabPanel>
            <TabPanel>
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
                    {activeStep < 8 ? (
                      <QuestionForm
                      data-testid="questionnaireForm"
                        step={activeStep}
                        answers={answers}
                        setAnswers={setAnswers}
                      />
                    ) : (
                      <Review answers={answers} />
                    )}
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
                      />
                    </Center>
                  </Stack>
                </Box>
              </Paper>
            </TabPanel>
          </Tabs>

          <Paper className={classes.paper}>
            <Center>
              <Button
                data-testid="submitbutton"
                righticon={<CheckCircleIcon />}
                variant="contained"
                color="primary"
                colorscheme="teal"
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
            </Center>
          </Paper>
        </Stack>
      </Box>
    );
  }

  return body;
};

export default NewSubmissionPage;

export const UPLOAD_SUBMISSION = gql`
  mutation createSubmission($images: [Upload!], $answers: String!) {
    createSubmission(images: $images, answers: $answers)
  }
`;
