import React, {FunctionComponent, useEffect, useRef} from 'react';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import {CircularProgress, MenuItem, MenuList} from "@mui/material";
import {Loading, useContext} from "../context/editorContext";
import MonacoEditor, { OnMount } from "@monaco-editor/react";
import {configuration, languageDef} from "./LexyLanguage";

function SourceEditor() {

  const editorRef = useRef(null);

  function handleEditorDidMount(editor: any, monaco: any) {
    console.log("handleEditorDidMount: " + monaco)
    if (!monaco.languages.getLanguages().some((value: any) => value.id === 'lexy')) {

      monaco.languages.register({ id: 'lexy' })
      monaco.languages.setMonarchTokensProvider('lexy', languageDef)
      monaco.languages.setLanguageConfiguration('lexy', configuration)
    }
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
  return <Editor value={currentFileDetails.code} language={'lexy'} onMount={handleEditorDidMount} />
}

export default SourceEditor;
