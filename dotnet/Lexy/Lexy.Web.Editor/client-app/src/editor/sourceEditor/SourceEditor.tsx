import React, {useEffect, useRef, useState} from 'react';
import MonacoEditor from '@monaco-editor/react';
import {CircularProgress} from "@mui/material";
import {useContext} from "../../context/editorContext";
import {conf, language} from "./lexyLanguage";
import {useMonaco} from "@monaco-editor/react"
import {isLoading, Loading} from "../../context/loading";
import {editor, languages} from "monaco-editor";
import Box from "@mui/material/Box";
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
import {where} from "lexy/dist/infrastructure/enumerableExtensions";

const space = ' '.charCodeAt(0);
const languageId = 'lexy';

function SourceEditor() {

  function initializeMonaco(){
    if (!monaco) return;
    monaco.languages.register({id: languageId});
    /* not yet working, using YAML for now
    monaco.languages.registerTokensProviderFactory(languageId, {
      create: () => language
    });
    monaco.languages.setLanguageConfiguration(languageId, conf); */
  }

  function showEditorPosition() {
    if (!editorRef.current || editorPosition == null || editorPosition.source == "editor") return;

    editorRef.current?.setPosition({
      lineNumber: editorPosition.lineNumber,
      column: editorPosition.column
    });
    editorRef.current?.revealLineInCenter(editorPosition.lineNumber);
    editorRef.current?.focus()
  }

  function showCode() {
    if (editorRef.current == null || currentFileCode == null || isLoading(currentFileCode) || currentFileCode.source == "editor") return;
    editorRef.current?.setValue(currentFileCode.code);
    editorRef.current?.revealLine(1);
  }

  function initializeEditorContent() {
    if (!editorRef.current || currentFileCode == null || isLoading(currentFileCode)) return;
    editorRef.current?.setValue(currentFileCode.code);
    editorRef.current?.revealLine(1);
    showMarkers();
  }

  function showMarkers() {
    if (!editorRef.current) return;
    if (currentFileLogging == null || isLoading(currentFileLogging) || monaco == null) return;
    if (currentFileCode == null || isLoading(currentFileCode)) return;

    const model = editorRef.current?.getModel();
    if (model == null) return;

    const markers = where(currentFileLogging, entry => entry.isError && currentFileCode.name == entry.reference.file.fileName)
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

  function getEndOfToken(lineContent: string, characterNumber: number): number {
    for (let index = characterNumber+1; index < lineContent.length ; index ++) {
      const value = lineContent.charCodeAt(index);
      if (value == space) return index;
    }
    return lineContent.length;
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

    const model = editorRef.current?.getModel();
    if (model == null) return;
    model.updateOptions({tabSize: 2, indentSize: 2});
  }

  const monaco = useMonaco();
  const editorRef = useRef<IStandaloneCodeEditor | null>(null);
  const {
    currentFileCode,
    setCurrentFileCode,
    currentFileLogging,
    editorPosition,
    setEditorPosition
  } = useContext();
  const [editorMounted, setEditorMounted] = useState(false);

  useEffect(initializeMonaco, [monaco]);
  useEffect(showEditorPosition, [editorPosition]);
  useEffect(showCode, [currentFileCode]);
  useEffect(showMarkers, [currentFileLogging])
  useEffect(initializeEditorContent, [editorMounted])

  if (!currentFileCode) {
    return <Box>No file selected</Box>;
  }

  if (isLoading(currentFileCode)) {
    return <CircularProgress/>;
  }

  return <MonacoEditor language={"yaml"} theme={"lexy-theme"}
                       onChange={handleEditorChange} onMount={handleEditorDidMount} />
}

export default SourceEditor;
