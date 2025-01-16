import React, {useEffect, useRef, useState} from 'react';
import MonacoEditor from '@monaco-editor/react';
import {CircularProgress} from "@mui/material";
import {useContext} from "../context/editorContext";
import {configuration, language} from "./lexy";
import {useMonaco} from "@monaco-editor/react"
import {isLoading, Loading} from "../context/loading";
import {editor} from "monaco-editor";
import Box from "@mui/material/Box";
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
import {where} from "lexy/dist/infrastructure/enumerableExtensions";
import setModelMarkers = editor.setModelMarkers;

const languageId = 'lexy';

function SourceEditor() {

  const monaco = useMonaco();
  const editorRef = useRef<IStandaloneCodeEditor | null>(null);
  const {
    currentFileDetails,
    setCurrentFileDetails,
    currentFileLogging,
    editorPosition,
    setEditorPosition
  } = useContext();
  const [rerenderMarkers, setRerenderMarkers] = useState(new Date());

  useEffect(() => {
    if (!monaco) return;
    monaco.languages.register({id: languageId});
    monaco.languages.registerTokensProviderFactory(languageId, {
      create: function() {
        return language;
      }
    });
    monaco.languages.setLanguageConfiguration(languageId, configuration);
  }, [monaco]);

  useEffect(() => {
    if (!editorRef.current || editorPosition == null || editorPosition.source == "editor") return;

    editorRef.current?.setPosition({
      lineNumber: editorPosition.lineNumber,
      column: editorPosition.column
    });
    editorRef.current?.revealLine(editorPosition.lineNumber);
    editorRef.current?.focus()
  }, [editorPosition]);

  function setMarkers() {
    if (!editorRef.current) return;
    if (currentFileLogging == null || isLoading(currentFileLogging) || monaco == null) return;

    const model = editorRef.current?.getModel();
    if (model == null) return;

    const markers = where(currentFileLogging, entry => entry.isError)
      .map(entry => {
        const word = model.getWordAtPosition({
          lineNumber: entry.reference.lineNumber,
          column: entry.reference.characterNumber
        });
        return {
          message: entry.message,
          severity: monaco.MarkerSeverity.Error,
          startLineNumber: entry.reference.lineNumber,
          startColumn: entry.reference.characterNumber,
          endLineNumber: entry.reference.lineNumber,
          endColumn: word != null ? word.endColumn : entry.reference.characterNumber + 1,
        }
      });

    monaco.editor.setModelMarkers(model, "owner", markers);
  }

  useEffect(setMarkers, [currentFileLogging, rerenderMarkers])

  function handleEditorChange(value: string | undefined) {
    if (!value) return;
    const details = currentFileDetails != null
      ? {...currentFileDetails, code: value}
      : {name: "untitled", identifier: "untitled", code: value,};
    setCurrentFileDetails(details);
  }

  function handleEditorDidMount(editor: IStandaloneCodeEditor){
    editorRef.current = editor;
    setRerenderMarkers(new Date());

    editor.onDidChangeCursorPosition(event => {
      setEditorPosition({
        lineNumber: event.position.lineNumber,
        column: event.position.column,
        source: "editor"
      });
    });
  }

  if (currentFileDetails instanceof Loading) {
    return <CircularProgress/>;
  }
  if (!currentFileDetails) {
    return <Box>No file selected</Box>;
  }

  return <MonacoEditor value={currentFileDetails.code} language={languageId} theme={"light"}
                       onChange={handleEditorChange} onMount={handleEditorDidMount} />
}

export default SourceEditor;
