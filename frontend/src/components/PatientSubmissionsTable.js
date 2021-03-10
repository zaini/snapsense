import { Button, Table, Tr, Td, Th, Thead, Tbody } from "@chakra-ui/react";

const PatientSubmissionsTable = () => {
  return (
    <Table size="sm">
      <Thead>
        <Tr>
          <Th>#</Th>
          <Th>Submission Type</Th>
          <Th>Patient</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>1</Td>
          <Td>Image / Questions</Td>
          <Td>Patient 1</Td>
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
          <Td>Image</Td>
          <Td>Patient 1</Td>
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
          <Td>Questions</Td>
          <Td>Patient 3</Td>
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
  );
};

export default PatientSubmissionsTable;
