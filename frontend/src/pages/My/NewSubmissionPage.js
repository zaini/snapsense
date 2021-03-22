import React from "react";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import {
  Heading,
  Stack,
  Box,
  Alert,
  Spinner,
  AlertIcon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

import Error from "../../components/utils/Error";
import InformationCard from "../../components/InformationCard";
import ImageUploadPanel from "../../components/SubmissionCreate/ImageUploadPanel";
import QuestionnairePanel from "../../components/SubmissionCreate/QuestionnairePanel";
import SubmitButtonPanel from "../../components/SubmissionCreate/SubmitButtonPanel";

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

const NewSubmissionPage = () => {
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
    console.log(answers);
  };
  const handleBack = () => {
    const temp = activeStep - 1;
    setActiveStep(temp);
  };

  let body;
  if (loading) {
    body = (
      <InformationCard
        head={
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        }
        body={
          <Heading color={"gray.700"} fontSize={"2xl"} fontFamily={"body"}>
            Loading...
          </Heading>
        }
      />
    );
  } else if (data) {
    body = (
      <InformationCard
        head={<CheckIcon />}
        body={
          <Heading color={"gray.700"} fontSize={"2xl"} fontFamily={"body"}>
            Form has been submitted !
          </Heading>
        }
      />
    );
  } else {
    body = (
      <Box className={classes.layout}>
        <Stack>
          {error && (
            <Error
              errors={[
                {
                  message: error.graphQLErrors[0].message,
                },
              ]}
            />
          )}
          <Alert status="info">
            <AlertIcon />
            Open the tabs to add your images or questionnaire or both!
          </Alert>
          <Tabs variant="enclosed">
            <TabList>
              <Tab>Image</Tab>
              <Tab>Questionnaire</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ImageUploadPanel classes={classes} setImages={setImages} />
              </TabPanel>
              <TabPanel>
                <QuestionnairePanel
                  classes={classes}
                  activeStep={activeStep}
                  answers={answers}
                  handleBack={handleBack}
                  handleNext={handleNext}
                  setAnswers={setAnswers}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
          <SubmitButtonPanel
            answers={answers}
            images={images}
            classes={classes}
            uploadSubmission={uploadSubmission}
          />
        </Stack>
      </Box>
    );
  }

  return body;
};

export default NewSubmissionPage;

const UPLOAD_SUBMISSION = gql`
  mutation createSubmission($images: [Upload!], $answers: String!) {
    createSubmission(images: $images, answers: $answers)
  }
`;
