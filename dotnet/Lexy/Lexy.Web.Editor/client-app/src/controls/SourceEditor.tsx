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

const space = ' '.charCodeAt(0);
const languageId = 'lexy';

function SourceEditor() {

  const monaco = useMonaco();
  const editorRef = useRef<IStandaloneCodeEditor | null>(null);
  const {
    currentFileCode,
    setCurrentFileCode,
    currentFileLogging,
    editorPosition,
    setEditorPosition
  } = useContext();
  const [editorMounter, setEditorMounted] = useState(false);

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
    editorRef.current?.revealLineInCenter(editorPosition.lineNumber);
    editorRef.current?.focus()
  }, [editorPosition]);

  useEffect(() => {
    if (!editorRef.current || currentFileCode == null || isLoading(currentFileCode) || currentFileCode.source == "editor") return;
    editorRef.current?.setValue(currentFileCode.code);
    editorRef.current?.revealLine(1);
  }, [currentFileCode]);

  useEffect(setMarkers, [currentFileLogging])

  useEffect(() => {
    if (!editorRef.current || currentFileCode == null || isLoading(currentFileCode)) return;
    editorRef.current?.setValue(currentFileCode.code);
    editorRef.current?.revealLine(1);
    setMarkers();
  }, [editorMounter])

  function getEndOfToken(lineContent: string, characterNumber: number): number {
    for (let index = characterNumber+1; index < lineContent.length ; index ++) {
      const value = lineContent.charCodeAt(index);
      if (value == space) return index;
    }
    return lineContent.length;
  }

  function setMarkers() {
    if (!editorRef.current) return;
    if (currentFileLogging == null || isLoading(currentFileLogging) || monaco == null) return;

    const model = editorRef.current?.getModel();
    if (model == null) return;

    const markers = where(currentFileLogging, entry => entry.isError)
      .map(entry => {
        const lineContent = model.getLineContent(entry.reference.lineNumber);
        const column = getEndOfToken(lineContent, entry.reference.characterNumber);
        return {
          message: entry.message,
          severity: monaco.MarkerSeverity.Error,
          startLineNumber: entry.reference.lineNumber,
          startColumn: entry.reference.characterNumber,
          endLineNumber: entry.reference.lineNumber,
          endColumn: column + 1,
        }
      });

    monaco.editor.setModelMarkers(model, "owner", markers);
  }

  function handleEditorChange(value: string | undefined) {
    if (!value) return;
    const details = currentFileCode != null && !isLoading(currentFileCode)
      ? {name: currentFileCode.name, identifier: currentFileCode.identifier, code: value, source: "editor"}
      : {name: "untitled", identifier: "untitled", code: value, source: "editor"};
    setCurrentFileCode(details);
  }

  function handleEditorDidMount(editor: IStandaloneCodeEditor){
    editorRef.current = editor;
    setEditorMounted(true);

    editor.onDidChangeCursorPosition(event => {
      setEditorPosition({
        lineNumber: event.position.lineNumber,
        column: event.position.column,
        source: "editor"
      });
    });
  }

  if (!currentFileCode) {
    return <Box>No file selected</Box>;
  }

  if (isLoading(currentFileCode)) {
    return <CircularProgress/>;
  }

  return <MonacoEditor language={languageId} theme={"light"}
                       onChange={handleEditorChange} onMount={handleEditorDidMount} />
}

export default SourceEditor;
