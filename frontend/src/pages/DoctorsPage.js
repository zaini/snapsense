import React from "react";
import ResponsiveDrawer from "../components/ResponsiveDrawer/ResponsiveDrawer";
import { Badge, Box, Image, Text } from "@chakra-ui/react";

const ResponsiveDrawerCustom = (props) => {
  return (
    <ResponsiveDrawer title="Snapsense AI - Doctor Console">
      <Text>
        All doctors in a tabular form
      </Text>
    </ResponsiveDrawer>
  );
};

export default ResponsiveDrawerCustom;
