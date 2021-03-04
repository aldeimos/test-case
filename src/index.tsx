import React from "react";
import ReactDOM from "react-dom";
import { App } from "./containters/App";
import "./index.scss";
import "./common/styles/input.scss";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
