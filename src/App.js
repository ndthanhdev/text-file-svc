import React from "react";
import "./styles.css";
import TextFilePreview from "./text-file-preview";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <TextFilePreview url="./num.txt" />
    </div>
  );
}
