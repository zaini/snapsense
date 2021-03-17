import { Divider, Box, SimpleGrid, Stack, Text } from "@chakra-ui/layout";
import { TextField } from "@material-ui/core";
import React from "react";
import Options from "./Options";

const Question = ({ question, onChangeOption, onChangeText }) => {
  return (
    <Stack w={"100%"}>
      <Text>{question.questionText}</Text>
      <Options
        options={question.answerOptions}
        onChangeOption={onChangeOption}
      />
      <Divider />
      <SimpleGrid column={[1]}>
        <TextField
          id="filled-multiline-flexible"
          label="Explain your choice (optional)"
          multiline
          rows={2}
          rowsMax={5}
          variant="filled"
          onChange={(event)=>{onChangeText(event.target.value)}}
        />
      </SimpleGrid>
    </Stack>
  );
};

export default Question;