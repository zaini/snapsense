import React from "react";
import { Divider, SimpleGrid, Stack, Text } from "@chakra-ui/layout";
import { TextField } from "@material-ui/core";
import Options from "./Options";

const Question = ({
  step,
  defVal,
  defExtra,
  question,
  onChangeOption,
  onChangeText,
}) => {
  return (
    <Stack w={"100%"}>
      <Text data-testid={`qText${step}`}>{question.questionText}</Text>
      <Options
        step={step}
        options={question.answerOptions}
        onChangeOption={onChangeOption}
      />
      <Divider />
      <SimpleGrid column={[1]}>
        <TextField
          data-testid={`qExtra${step}`}
          id="filled-multiline-flexible"
          label="Explain your choice (optional)"
          multiline
          rows={2}
          rowsMax={5}
          variant="filled"
          onChange={(event) => {
            onChangeText(event.target.value);
          }}
        />
      </SimpleGrid>
    </Stack>
  );
};

export default Question;
