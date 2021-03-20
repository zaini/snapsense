import React from "react";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import { SimpleGrid, Stack } from "@chakra-ui/layout";
import ReviewListItem from "./ReviewListItem";

const Review = ({ answers }) => {
  return (
    <Box>
      <Stack style={{ margin: "3px" }}>
        <Typography style={{ marginLeft: "5px" }} variant="h5" gutterBottom>
          Submission Summary
        </Typography>
        <SimpleGrid columns={[1, 1, 2, 3, 4]}>
          {Object.keys(answers.questionnaire).map((i) => (
            <ReviewListItem
              key={`reviewList${i}`}
              answerIndex={i}
              answer={answers.questionnaire[i].val}
              extra={answers.questionnaire[i].extra}
            />
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default Review;
