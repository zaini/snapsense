import React from "react";
import { Flex } from "@chakra-ui/react";

const LandingLayout = (props) => {
  return (
    <Flex
      direction="column"
      align="center"
      maxW={{ xl: "1200px" }}
      m="0 auto"
      {...props}
    >
      {props.children}
    </Flex>
  );
};

export default LandingLayout;
