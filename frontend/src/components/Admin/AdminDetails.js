import React from "react";
import { FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";

import CopyLink from "../utils/CopyLink";

const AdminDetails = ({ admin }) => {
  return (
    <Stack spacing={4}>
      <FormControl id="id">
        <FormLabel>ID</FormLabel>
        <Input data-testid="adminIDHolder" value={admin.id} isReadOnly />
      </FormControl>
      <FormControl id="fname">
        <FormLabel>First name</FormLabel>
        <Input data-testid="adminFNameHolder" value={admin.fname} isReadOnly />
      </FormControl>
      <FormControl id="lname">
        <FormLabel>Last name</FormLabel>
        <Input data-testid="adminLNameHolder" value={admin.lname} isReadOnly />
      </FormControl>
      <FormControl id="hospital">
        <FormLabel>Hospital</FormLabel>
        <Input
          data-testid="hospitalNameHolder"
          value={admin.Hospital.name}
          isReadOnly
        />
      </FormControl>
      <FormControl id="email">
        <FormLabel>Email</FormLabel>
        <div data-testid="hospitalEmailHolder">
          <CopyLink link={admin.email} />
        </div>
      </FormControl>
    </Stack>
  );
};

export default AdminDetails;