import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

import App from "./App";
import "./index.css";

ReactDOM.render(
  <Router>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </Router>,
  document.getElementById("root")
);
