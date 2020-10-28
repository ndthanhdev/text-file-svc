import React from "react";
import ReactDOM from "react-dom";
import * as TextReaderSvc from "./text-reader-svc";

import App from "./App";

window.__DEV__ = true;

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

TextReaderSvc.read("./utf8.txt", {
  maxSize: 99999,
  chunkSize: 9999
}).then((text) => console.log(text));
