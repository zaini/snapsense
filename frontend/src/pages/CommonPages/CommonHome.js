import React from "react";
import ResponsiveDrawer from "../../components/ResponsiveDrawer/ResponsiveDrawer";
import { Box, Text, SimpleGrid,Heading } from "@chakra-ui/react";

const pageModules = [
  ["Patient", "/patient/home"],
  ["Doctor", "/doctor/home"],
  ["Admin", "/admin/home"],
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
      <Heading fontSize={{ base: "24px", md: "32px", lg: "42px" }} paddingBottom={{base:"15px"}}>
        Welcome, `John doe`!
      </Heading>
      <SimpleGrid columns={[1, 1, 2]} spacing="40px">
        <Box bg="#9C3848" height="80px"></Box>
        <Box bg="#9C3848" height="80px"></Box>
        <Box bg="#9C3848" height="80px"></Box>
        <Box bg="#9C3848" height="80px"></Box>
        <Box bg="#9C3848" height="80px"></Box>
      </SimpleGrid>
    </ResponsiveDrawer>
  );
};

export default ResponsiveDrawerCustom;
