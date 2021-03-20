import { Input } from "@chakra-ui/input";
import { Center, SimpleGrid, Text } from "@chakra-ui/layout";
import React from "react";

const InputFieldProvider = ({ title, name, desc, register }) => {
  return (
    <SimpleGrid columns={[2]} spacing={2}>
      <Input
        placeholder={title}
        name={name}
        type="number"
        max="20"
        min="1"
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
