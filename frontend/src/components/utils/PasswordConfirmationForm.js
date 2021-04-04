import React from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

const PasswordConfirmationForm = ({ register, onSubmit, handleSubmit }) => {
  return (
    <form name="passwordConfirmation" onSubmit={handleSubmit(onSubmit)}>
      <FormControl id="password" isRequired>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          data-testid="password"
          type="password"
          name="password"
          placeholder="Password"
          ref={register}
        />
      </FormControl>
      <br />
      <FormControl id="repeat_password" isRequired>
        <FormLabel htmlFor="repeat_password">Repeat Password</FormLabel>
        <Input
          data-testid="passwordRepeat"
          type="password"
          name="repeat_password"
          placeholder="Repeat password"
          ref={register}
        />
      </FormControl>
    </form>
  );
};

export default PasswordConfirmationForm;
