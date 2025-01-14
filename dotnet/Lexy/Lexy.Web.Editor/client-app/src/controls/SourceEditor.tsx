import React, {FunctionComponent, useEffect, useRef} from 'react';
import Editor from '@monaco-editor/react';
import {CircularProgress, MenuItem, MenuList} from "@mui/material";
import {Loading, useContext} from "../context/editorContext";
import {configuration, languageDef, options} from "./LexyLanguage";
import Monaco from "@monaco-editor/react";
import {useMonaco} from "@monaco-editor/react"

function SourceEditor() {

  const monaco = useMonaco();
  useEffect(() => {
    if (monaco) {
      console.log("handleEditorDidMount: " + monaco)
      // if (!monaco.languages.getLanguages().some((value: any) => value.id === 'lexy')) {

      monaco.languages.register({id: 'lexy'})
      monaco.languages.setMonarchTokensProvider('lexy', {
        tokenizer: {
          root: [
            [/\[error.*/, "custom-error"],
            [/\[notice.*/, "custom-notice"],
            [/\[info.*/, "custom-info"],
            [/\[[a-zA-Z 0-9:]+]/, "custom-date"],
          ],
        },
      });
      monaco.editor.defineTheme("myCoolTheme", {
        base: "vs",
        inherit: false,
        rules: [
          {token: "custom-info", foreground: "808080"},
          {token: "custom-error", foreground: "ff0000", fontStyle: "bold"},
          {token: "custom-notice", foreground: "FFA500"},
          {token: "custom-date", foreground: "008800"},
        ],
        colors: {
          "editor.foreground": "#000000",
        },
      });


      /* monaco.languages.setLanguageConfiguration('lexy', new {

      }) */
      // }
    }
  }, [monaco]);

  function handleEditorDidMount(editor: any, monaco: any) {

  }

  const {
    currentFileDetails,
  } = useContext();

  if (currentFileDetails instanceof Loading) {
    return <CircularProgress/>;
  }
  if (!currentFileDetails) {
    return <Editor/>
  }
  return <Editor value={currentFileDetails.code} language={'lexy'} theme={"myCoolTheme"} />
}

export default SourceEditor;
