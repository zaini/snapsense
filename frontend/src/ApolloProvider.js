import React from "react";
import App from "./App";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { ChakraProvider } from "@chakra-ui/react";
import { createUploadLink } from "apollo-upload-client";

import { AuthProvider } from "./context/auth";
import customTheme from "./utils/theme";

// virtual machine

const uploadLink = createUploadLink({
  // uri: process.env.BACKEND_URL || "http://192.68.137.129:5000/graphql",
  uri: process.env.BACKEND_URL || "http://localhost:5000/graphql",
  headers: {
    "keep-alive": "true",
  },
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const appExport = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <ChakraProvider theme={customTheme}>
          <App />
        </ChakraProvider>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default appExport;
