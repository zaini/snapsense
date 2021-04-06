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
          <Heading data-testid="hospitalHeader">{hospital.name}</Heading>
        </Center>
        <hr />
        <FormControl id="id">
          <FormLabel>ID</FormLabel>
          <Input data-testid="hospitaIDHolder" value={hospital.id} isReadOnly />
        </FormControl>
        <FormControl id="name">
          <FormLabel>Hospital name</FormLabel>
          <Input data-testid="hospitalNameHolder" value={hospital.name} isReadOnly />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Contact Email</FormLabel>
          <div data-testid="hospitalEmailHolder">
            <CopyLink link={hospital.contact_email} />
          </div>
        </FormControl>
        <hr />
      </Stack>
    </Container>
  );
};

export default HospitalDetails;
