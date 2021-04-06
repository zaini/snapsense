import { useState } from "react";
import { Center, Radio, RadioGroup, Stack } from "@chakra-ui/react";

const Options = ({ step, defVal, options, onChangeOption }) => {
  const [value, setValue] = useState();

  return (
    <Center>
      <RadioGroup
        onChange={(index) => {
          setValue(index);
          onChangeOption(index);
        }}
        value={value}
      >
        <Stack>
          {options.map((e, i) => (
            <Radio data-testid={`q${step}Option${i}`} key={i} value={`${i}`}>
              {e.answerText}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </Center>
  );
};

export default Options;
