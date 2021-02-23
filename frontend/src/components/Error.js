import { Container } from "@chakra-ui/react";

// TODO make errors look nicer
const Error = ({ errors }) => {
  return (
    <Container>
      {Object.keys(errors).map((key, i) => {
        return <p>{errors[key].message}</p>;
      })}
    </Container>
  );
};

export default Error;
