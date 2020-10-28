import * as React from "react";
import * as Service from "./text-file-svc";

const InitState = {
  isOpen: true,
  title: null,
  value: null,
  service: Service
};

export const TextFileEditorContext = React.createContext(InitState);

export const TextFileEditorProvider = React.memo(
  function TextFileEditorProvider({ initState = InitState, children }) {
    return (
      <TextFileEditorContext.Provider value={initState}>
        {children}
      </TextFileEditorContext.Provider>
    );
  }
);

// if (__DEV__) {
//   TextFileEditorContext.displayName = "TextFileEditorContext";
// }
