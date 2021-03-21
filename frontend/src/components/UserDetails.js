import React from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

import CopyLink from "./utils/CopyLink";

const UserDetails = ({ user }) => {
  let markup;

  if (user.accountType === "SUPERADMIN") {
    markup = (
      <>
        <FormControl id="name">
          <FormLabel>Name</FormLabel>
          <Input value={user.name} isReadOnly />
        </FormControl>
        <br />
        <br />
      </>
    );
  } else {
    markup = (
      <>
        <FormControl id="first_name">
          <FormLabel>First name</FormLabel>
          <Input value={user.fname} isReadOnly />
        </FormControl>
        <br />
        <FormControl id="last_name">
          <FormLabel>Last name</FormLabel>
          <Input value={user.lname} isReadOnly />
        </FormControl>
        <br />
      </>
    );
  }
  return (
    <>
      {markup}
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <CopyLink link={user.email} />
      </FormControl>
    </>
  );
};

export default UserDetails;
