import React from "react";
import ResponsiveDrawer from "../../components/ResponsiveDrawer/ResponsiveDrawer";
import {
  Box,
  Text,
  Heading,
  Stack,
  Divider,
  Button,
  Table,
  Tr,
  Td,
  Th,
  Thead,
  Tbody,
  Tfoot,
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
          <Heading fontSize={{ base: "20px", md: "26px" }}>
            List of all Hospitals
          </Heading>
          <Divider />
        </Stack>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Hospital Name</Th>
                <Th>View</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>1</Td>
                <Td>Hospital 1</Td>
                <Td>
                  <Button
                    alignSelf={"center"}
                    bg={"primary.900"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    View
                  </Button>
                </Td>
              </Tr>

              <Tr>
                <Td>2</Td>
                <Td>Hospital 2</Td>
                <Td>
                  <Button
                    alignSelf={"center"}
                    bg={"primary.900"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    View
                  </Button>
                </Td>
              </Tr>

              <Tr>
                <Td>3</Td>
                <Td>Hospital 3</Td>
                <Td>
                  <Button
                    alignSelf={"center"}
                    bg={"primary.900"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    View
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Box>
    </ResponsiveDrawer>
  );
};

export default ResponsiveDrawerCustom;
