import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraBaseProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import ChatProvider from "./Context/ChatProviders";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";

const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = extendTheme({
  // Add your custom theme configurations here
});

root.render(
  <BrowserRouter>
    <ChatProvider>
      <ChakraBaseProvider theme={theme}>
        <App />
      </ChakraBaseProvider>
    </ChatProvider>
  </BrowserRouter>
);
