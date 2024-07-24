import React from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-chrome";
import ace from "ace-builds/src-noconflict/ace";

// Configure the path for Ace workers (for the code editor)
ace.config.setModuleUrl(
  "ace/mode/javascript_worker",
  "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/worker-javascript.js"
);

const CodeEditor = ({ code, onChange, readOnly }) => (
  <AceEditor
    mode="javascript"
    theme="chrome"
    value={code}
    onChange={onChange}
    readOnly={readOnly}
    width="100%"
  />
);

export default CodeEditor;
