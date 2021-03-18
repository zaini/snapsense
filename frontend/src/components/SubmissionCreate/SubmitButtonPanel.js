import React from "react";
import { Button, Paper } from "@material-ui/core";
import { Center } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

const SubmitButtonPanel = ({ answers, images, classes, uploadSubmission }) => {
  return (
    <Paper className={classes.paper}>
      <Center>
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
      </Center>
    </Paper>
  );
};

export default SubmitButtonPanel;
