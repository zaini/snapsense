import React from "react";
import { Button } from "@material-ui/core";

const NextButton = ({ handleNext, classes, name, disabled = false }) => {
  return (
    <Button
      data-testid="nextButton"
      variant="contained"
      color="primary"
      onClick={handleNext}
      className={classes}
      disabled={disabled}
    >
      {name}
    </Button>
  );
};

export default NextButton;
