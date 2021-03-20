import React from "react";
import {
  FormControl,
  FormLabel,
  Container,
  Input,
  Heading,
  Center,
} from "@chakra-ui/react";

import CopyLink from "../utils/CopyLink";

const HospitalDetails = ({ hospital }) => {
  return (
    <Container>
      <Center>
        <Heading>{hospital.name}</Heading>
      </Center>
      <br />
      <hr />
      <br />
      <FormControl id="id">
        <FormLabel>ID</FormLabel>
        <Input value={hospital.id} isReadOnly />
      </FormControl>
      <br />
      <FormControl id="name">
        <FormLabel>Hospital name</FormLabel>
        <Input value={hospital.name} isReadOnly />
      </FormControl>
      <br />
      <FormControl id="email">
        <FormLabel>Contact Email</FormLabel>
        <CopyLink link={hospital.contact_email} />
      </FormControl>
      <br />
      <br />
      <hr />
      <br />
    </Container>
  );
};

export default HospitalDetails;
