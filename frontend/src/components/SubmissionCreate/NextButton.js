import React from "react";
import { Button } from "@material-ui/core";

const NextButton = ({
  setReviewBtn,
  activeStep,
  handleNext,
  classes,
}) => {
  let params;
  let name = "Next";
  if (activeStep === 8) {
    setReviewBtn(true);
    name = "Submit";
    params = {
      disabled: true,
      style: {
        display: "none",
      },
    };
  } else if (activeStep === 7) {
    setReviewBtn(false);
    name = "Review";
    params = {};
  } else {
    setReviewBtn(false);
    params = {};
  }

  return (
    <Button
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
