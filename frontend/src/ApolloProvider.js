import React from "react";
import App from "./App";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { ChakraProvider } from "@chakra-ui/react";

import { AuthProvider } from "./context/auth";
import customTheme from "./utils/theme";

const backendLink = createHttpLink({
  uri: process.env.BACKEND_URL || "http://localhost:5000/graphql",
});

// TODO: Once login is setup, use setContext to create an auth context

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
  link: authLink.concat(backendLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default () => {
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
