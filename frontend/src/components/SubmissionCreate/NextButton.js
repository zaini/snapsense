import React from "react";
import { Button } from "@material-ui/core";

const NextButton = ({ activeStep, handleNext, classes }) => {
  let params;
  let name = "Next";
  if (activeStep === 8) {
    name = "Submit";
    params = {
      disabled: true,
      style: {
        display: "none"
      }
    };
  } else if (activeStep === 7) {
    name = "Review";
    params = {};
  } else {
    params = {};
  }

  return (
    <Button
      data-testid="nextButton"
      {...params}
      variant="contained"
      color="primary"
      onClick={handleNext}
      className={classes.button}
    >
      {name}
    </Button>
  );
};

export default NextButton;
