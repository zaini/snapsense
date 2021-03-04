import React from "react";
import ResponsiveDrawer from "../../components/ResponsiveDrawer/ResponsiveDrawer";
import { Box, Text, SimpleGrid } from "@chakra-ui/react";

const pageModules = [
    ["Home", "/sadmin/home"],
    ["Hospitals", "/sadmin/hospitals"],
    ["Single Hosp", "/sadmin/hospital/:hospital_id"],
    ["Admins", "/sadmin/admins"],
    ["Single Admin", "/sadmin/admin/:admin_id"],
  ];
  
  const pageBottomModules = [
    ["Dashboard", "/dashboard"],
    ["Landing Page", "/"],
    ["Profile", "/profile"],
    ["Logout", "/logout"],
  ];

const ResponsiveDrawerCustom = (props) => {
  return (
    <ResponsiveDrawer
      title="Snapsense AI - Common Profile"
      listOne={pageModules}
      listTwo={pageBottomModules}
    >
      <Text
        fontSize={{ base: "24px", md: "32px", lg: "42px" }}
        paddingBottom={{ base: "15px" }}
      >
        Welcome, `John doe`!
      </Text>
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
