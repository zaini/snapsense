import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import ApolloProvider from "./ApolloProvider";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App";
import customTheme from "./utils/theme";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <ApolloProvider>
        <App />
      </ApolloProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
