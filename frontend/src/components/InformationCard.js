import React from "react";
import { Heading, Stack, Box, Center } from "@chakra-ui/react";

const InformationCard = ({ head, body }) => {
  return (
    <Center py={6}>
      <Box
        maxW={"445px"}
        w={"full"}
        bg={"white"}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Stack>
          <Heading>
            <Center>{head}</Center>
          </Heading>
          {body}
        </Stack>
      </Box>
    </Center>
  );
};

export default InformationCard;
