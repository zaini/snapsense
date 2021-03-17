import React from "react";
import { Button } from "@material-ui/core";

const BackButton = ({ activeStep, handleBack, classes }) => {
  let params;
  if (activeStep > 0) {
    params = {};
  } else {
    params = {
      disabled: true,
    };
  }

  return (
    <Button
      {...params}
      variant="contained"
      color="secondary"
      onClick={handleBack}
      className={classes.button}
    >
      Back
    </Button>
  );
};

export default BackButton;
