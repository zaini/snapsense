import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "tachyons";
import ApolloProvider from "./ApolloProvider";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider />
  </React.StrictMode>,
  document.getElementById("root")
);
