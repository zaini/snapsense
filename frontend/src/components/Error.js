import { Container } from "@chakra-ui/react";

// TODO make errors look nicer
const Error = ({ errors }) => {
  return (
    <Container>
      <ul>
        {Object.keys(errors).map((key, i) => {
          return <li key={i}>{errors[key].message}</li>;
        })}
      </ul>
    </Container>
  );
};

export default Error;
