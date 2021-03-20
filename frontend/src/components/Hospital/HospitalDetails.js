import React from "react";
import {
  Center,
  FormControl,
  FormLabel,
  Container,
  Input,
  Stack,
  Heading,
} from "@chakra-ui/react";

import CopyLink from "../utils/CopyLink";

const HospitalDetails = ({ hospital }) => {
  return (
    <Container>
      <Stack spacing={4}>
        <Center>
          <Heading>{hospital.name}</Heading>
        </Center>
        <hr />
        <FormControl id="id">
          <FormLabel>ID</FormLabel>
          <Input value={hospital.id} isReadOnly />
        </FormControl>
        <FormControl id="name">
          <FormLabel>Hospital name</FormLabel>
          <Input value={hospital.name} isReadOnly />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Contact Email</FormLabel>
          <CopyLink link={hospital.contact_email} />
        </FormControl>
        <hr />
      </Stack>
    </Container>
  );
};

export default HospitalDetails;
