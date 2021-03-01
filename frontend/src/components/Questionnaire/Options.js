import { useState } from "react";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

const Options = ({ options, onChangeOption }) => {
  const [value, setValue] = useState();

  return (
    <>
      <RadioGroup
        onChange={(index) => {
          setValue(index);
          onChangeOption(index);
        }}
        value={value}
      >
        <Stack>
          {options.map((e, i) => (
            <Radio key={i} value={`${i}`}>
              {e.answerText}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </>
  );
};

export default Options;
