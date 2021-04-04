import React from "react";
import { Button } from "@material-ui/core";

const BackButton = ({ activeStep, handleBack, classes, disabled = false }) => {
  return (
    <Button
      data-testid="backButton"
      variant="contained"
      color="secondary"
      onClick={handleBack}
      className={classes.button}
      disabled={disabled}
    >
      Back
    </Button>
  );
};

export default BackButton;
