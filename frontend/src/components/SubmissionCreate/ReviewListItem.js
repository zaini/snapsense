import { Heading, Stack, Text } from "@chakra-ui/layout";
import { Box } from "@material-ui/core";
import React from "react";
import questionsObject from "../../utils/QuestionsObject";

const answerOption = ["No", "Yes"];

const ReviewListItem = ({ display, answerIndex, answer, extra }) => {
  return (
    <Box
      hidden={display}
      w={"full"}
      style={{ backgroundColor: "#edf8ff", margin: "5px" }}
      boxShadow={"2xl"}
      rounded={"md"}
      p={3}
    >
      <Stack>
        <Heading color={"gray.700"} fontSize={"2xl"} fontFamily={"body"}>
          {questionsObject[answerIndex - 1].questionText}
        </Heading>
        <Text color={"gray.600"} data-testid={`aOption${answerIndex}`}>
          {answerOption[parseInt(answer)]}
        </Text>
        <Text color={"gray.500"}>{extra}</Text>
      </Stack>
    </Box>
  );
};

export default ReviewListItem;
