import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="100vh"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          An Error Occured!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Something went wrong. If this persists, please send us feedback{" "}
          {<Link to="/feedback">here.</Link>}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ErrorPage;
