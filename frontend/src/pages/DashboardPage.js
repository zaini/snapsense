import React from "react";
import ResponsiveDrawer from "../components/ResponsiveDrawer/ResponsiveDrawer";
import { Box, Text, SimpleGrid, Heading, Stack } from "@chakra-ui/react";

const pageModules = [
  ["Patient", "/patient/home"],
  ["Doctor", "/doctor/home"],
  ["Admin", "admin/home"],
  ["Super Admin", "/sadmin/home"],
];

const pageBottomModules = [
  ["Landing Page", "/"],
  ["Profile", "/profile"],
  ["Logout", "/logout"],
];

const ResponsiveDrawerCustom = (props) => {
  return (
    <ResponsiveDrawer
      title="Snapsense AI - Common Home Page"
      listOne={pageModules}
      listTwo={pageBottomModules}
    >
      <Stack spacing={2} m={{ base: "15px" }}>
        <Heading fontSize={{ base: "24px", md: "32px", lg: "42px" }}>
          Welcome, `John doe`!
        </Heading>
        <Text>Click on the user view you would like to continue with.</Text>
      </Stack>
    </ResponsiveDrawer>
  );
};

export default ResponsiveDrawerCustom;
