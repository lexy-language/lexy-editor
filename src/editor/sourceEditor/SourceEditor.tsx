import React, {useEffect, useRef, useState} from 'react';
import MonacoEditor from '@monaco-editor/react';
import {CircularProgress} from "@mui/material";
import {useContext} from "../../context/editorContext";
import {useMonaco} from "@monaco-editor/react"
import {isLoading} from "../../context/loading";
import {editor} from "monaco-editor";
import Box from "@mui/material/Box";
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
import {where} from "lexy/dist/infrastructure/enumerableExtensions";
import IStandaloneEditorConstructionOptions = editor.IStandaloneEditorConstructionOptions;

const space = ' '.charCodeAt(0);
const languageId = 'lexy';

export default function SourceEditor() {

  const monaco = useMonaco();
  const editorRef = useRef<IStandaloneCodeEditor | null>(null);
  const {
    currentFileCode,
    setCurrentFileCode,
    setCurrentProject,
    currentFileLogging,
    editorPosition,
    setEditorPosition
  } = useContext();
  const [editorMounted, setEditorMounted] = useState(false);

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
    if (!editorRef.current || editorPosition === null || editorPosition.source === "editor") return;

    editorRef.current?.setPosition({
      lineNumber: editorPosition.lineNumber,
      column: editorPosition.column
    });
    editorRef.current?.revealLineInCenter(editorPosition.lineNumber);
    editorRef.current?.focus()
  }

  function showCode() {
    if (editorRef.current === null || currentFileCode === null || isLoading(currentFileCode) || currentFileCode.source === "editor") return;
    editorRef.current?.setValue(currentFileCode.code);
    editorRef.current?.revealLine(1);
  }

  function initializeEditorContent() {
    if (!editorRef.current || currentFileCode === null || isLoading(currentFileCode)) return;
    editorRef.current?.setValue(currentFileCode.code);
    editorRef.current?.revealLine(1);
    showMarkers();
  }

  function getEndOfToken(lineContent: string, characterNumber: number): number {
    for (let index = characterNumber+1; index < lineContent.length ; index ++) {
      const value = lineContent.charCodeAt(index);
      if (value === space) return index;
    }
    return lineContent.length;
  }

  function handleEditorChange(value: string | undefined, second: any) {
    if (!value) return;
    console.log("handleEditorChange")
    if (!currentFileCode || isLoading(currentFileCode)) return;
    if (currentFileCode.code === value) return;

    let details = {name: currentFileCode.name, identifier: currentFileCode.identifier, code: value, source: "editor"};
    setCurrentFileCode(details);

    setCurrentProject(state => {
      return state.setFile(details.identifier, value);
    });
  }

  function handleEditorDidMount(editor: IStandaloneCodeEditor){
    editorRef.current = editor;
    editorRef.current?.updateOptions({
      scrollbar: {
        horizontal: "hidden"
      }
    });
    setEditorMounted(true);

    editor.onDidChangeCursorPosition(event => {
      setEditorPosition({
        lineNumber: event.position.lineNumber,
        column: event.position.column,
        source: "editor"
      });
    });

    const model = editorRef.current?.getModel();
    if (model === null) return;
    model.updateOptions({tabSize: 2, indentSize: 2});
  }

  function showMarkers() {
    if (!editorRef.current) return;
    if (currentFileLogging === null || isLoading(currentFileLogging) || monaco === null) return;
    if (currentFileCode === null || isLoading(currentFileCode)) return;

    const model = editorRef.current?.getModel();
    if (model === null) return;

    const markers = where(currentFileLogging, entry => entry.isError && currentFileCode.name === entry.reference.file.fileName)
      .map(entry => {
        const lineContent = entry.reference.lineNumber > 0 && entry.reference.lineNumber <= model.getLineCount() ? model.getLineContent(entry.reference.lineNumber) : null;
        const column = lineContent ? getEndOfToken(lineContent, entry.reference.characterNumber) : 1;
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

  useEffect(initializeMonaco, [monaco]);
  useEffect(showEditorPosition, [editorPosition]);
  useEffect(showCode, [currentFileCode]);
  useEffect(showMarkers, [currentFileLogging, monaco, currentFileCode])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(initializeEditorContent, [editorMounted])

  if (!currentFileCode) {
    return <Box>No file selected</Box>;
  }

  if (isLoading(currentFileCode)) {
    return <CircularProgress/>;
  }

  const options: IStandaloneEditorConstructionOptions = {
    scrollbar: {
      horizontal: "hidden"
    },

    wordWrap: "on"
  };

  return <MonacoEditor language={"yaml"} theme={"lexy-theme"}
                       onChange={handleEditorChange} onMount={handleEditorDidMount}
                       options={options} />
}