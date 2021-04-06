import { Alert, AlertIcon, Container } from "@chakra-ui/react";

const Error = ({ errors }) => {
  return (
    <Container>
      <ul>
        {Object.keys(errors).map((key, i) => {
          return (
            <Alert status="error" borderRadius="50px" key={i}>
              <AlertIcon />
              {errors[key].message}
            </Alert>
          );
        })}
      </ul>
    </Container>
  );
};

export default Error;
