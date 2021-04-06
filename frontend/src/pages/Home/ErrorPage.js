import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Text,
  Container,
  Link,
} from "@chakra-ui/react";

const ErrorPage = () => {
  return (
    <Container>
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="450px"
        border="1px"
        borderColor="#262626"
      >
        <AlertIcon boxSize="50px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg" data-testid="error-title">
          404: Page not found 😢
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          <Text>
            Something went wrong. If this persists, please send us feedback{" "}
            {
              <Link color="teal.500" href="/feedback">
                here.
              </Link>
            }
          </Text>
        </AlertDescription>
      </Alert>
    </Container>
  );
};

export default ErrorPage;
