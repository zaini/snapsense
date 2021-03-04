import React from "react";
import ResponsiveDrawer from "../../components/ResponsiveDrawer/ResponsiveDrawer";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  Divider,
  HStack,
} from "@chakra-ui/react";

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
      title="Snapsense AI - Common Profile"
      listOne={pageModules}
      listTwo={pageBottomModules}
    >
      <Box padding={{ base: "20px" }} width="100%">
        <Stack mb={"20px"}>
          <Heading fontSize={"4xl"}>Welcome, John Doe !</Heading>
          <Divider />
        </Stack>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <HStack spacing={4}>
              <FormControl id="name">
                <FormLabel>First Name</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="name">
                <FormLabel>Last Name</FormLabel>
                <Input type="email" />
              </FormControl>
            </HStack>

            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Button
                width="100px"
                alignSelf={"center"}
                bg={"primary.900"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Save
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </ResponsiveDrawer>
  );
};

export default ResponsiveDrawerCustom;
