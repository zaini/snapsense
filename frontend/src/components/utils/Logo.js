import React from "react";
import { Box } from "@chakra-ui/react";
import logoImage from "../../logo.png";

export default function Logo(props) {
  return (
    <Box {...props}>
      <img src={logoImage} alt="logo" />
    </Box>
  );
}
