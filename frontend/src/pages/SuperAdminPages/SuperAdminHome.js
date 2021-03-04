import React from "react";
import ResponsiveDrawer from "../../components/ResponsiveDrawer/ResponsiveDrawer";
import {
  Box,
  Text,
  SimpleGrid,
  Heading,
  Stack,
  Divider,
  Button,
} from "@chakra-ui/react";

const pageModules = [
  ["Home", "/sadmin/home"],
  ["Hospitals", "/sadmin/hospitals"],
  ["Single Hosp", "/sadmin/hospital/:hospital_id"],
  ["Admins", "/sadmin/admins"],
  ["Single Admin", "/sadmin/admin/:admin_id"],
];

const pageBottomModules = [
  ["Landing Page", "/"],
  ["Profile", "/profile"],
  ["Logout", "/logout"],
];

const ResponsiveDrawerCustom = (props) => {
  return (
    <ResponsiveDrawer
      title="Snapsense AI - Super Admin Panel"
      listOne={pageModules}
      listTwo={pageBottomModules}
    >
      <Box padding={{ base: "20px" }} width="100%">
        <Stack mb={"20px"}>
          <Heading fontSize={"4xl"}>Welcome, Super Admin !</Heading>
          <Divider />
        </Stack>
        <SimpleGrid columns={[1, 1, 2, 2]} spacing="40px">
          <Box w={"full"} bg={"white"} boxShadow={"2xl"} rounded={"md"}>
            <Stack
              textAlign={"center"}
              p={2}
              color={"gray.800"}
              align={"center"}
            >
              <Text
                fontSize={{ base: "20px", md: "25px", lg: "30px" }}
                fontWeight={800}
              >
                Hospitals
              </Text>
            </Stack>

            <Box bg={"gray.50"} px={6} py={10}>
              <Button
                mt={2}
                w={"full"}
                bg={"primary.900"}
                color={"white"}
                rounded={"lg"}
                _hover={{
                  bg: "primary.600",
                }}
                _focus={{
                  bg: "primary.700",
                }}
              >
                View All 5
              </Button>
            </Box>
          </Box>
        </SimpleGrid>
      </Box>
    </ResponsiveDrawer>
  );
};

export default ResponsiveDrawerCustom;
