import { Input } from "@chakra-ui/input";
import { Center, SimpleGrid, Text } from "@chakra-ui/layout";
import React from "react";

const InputFieldProvider = ({ testName, title, name, desc, register }) => {
  return (
    <SimpleGrid columns={[2]} spacing={2}>
      <Input
        data-testid={testName}
        placeholder={title}
        name={name}
        type="number"
        max="20"
        min="0"
        defaultValue="0"
        ref={register}
        required
      />
      <Center>
        <Text>{desc}</Text>
      </Center>
    </SimpleGrid>
  );
};

export default InputFieldProvider;
