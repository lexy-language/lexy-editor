import React, {useEffect, useRef, useState} from 'react';
import MonacoEditor from '@monaco-editor/react';
import {CircularProgress} from "@mui/material";
import {useProjectContext} from "../../context/project/context";
import {useMonaco} from "@monaco-editor/react"
import {isLoading} from "../../context/loading";
import {editor} from "monaco-editor";
import Box from "@mui/material/Box";
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
import {firstOrDefault, where} from "lexy/dist/infrastructure/arrayFunctions";
import IStandaloneEditorConstructionOptions = editor.IStandaloneEditorConstructionOptions;
import {useEditorContext} from "../../context/editor/context";

const space = ' '.charCodeAt(0);
const languageId = 'lexy';

export default function SourceEditor() {

  const monaco = useMonaco();
  const editorRef = useRef<IStandaloneCodeEditor | null>(null);
  const {editorPosition, setEditorPosition} = useEditorContext();
  const {
    currentFileCode,
    setCurrentFileCode,
    currentFileLogging
  } = useProjectContext();
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

    const reason = firstOrDefault<{metadata: {source: string}}>(second.detailedReasons)?.metadata?.source;
    if (reason == "setValue") return;
    console.log("handleEditorChange: " + JSON.stringify(second));
    if (!value) return;
    if (!currentFileCode || isLoading(currentFileCode)) return;
    if (currentFileCode.code === value) return;

    let details = {name: currentFileCode.name, identifier: currentFileCode.identifier, code: value, source: "editor"};
    setCurrentFileCode(details);
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

    const markers = where(currentFileLogging, entry => entry.isError && currentFileCode.name === entry.fileName)
      .map(entry => {
        const lineContent = entry.lineNumber > 0 && entry.lineNumber <= model.getLineCount() ? model.getLineContent(entry.lineNumber) : null;
        const column = lineContent ? getEndOfToken(lineContent, entry.characterNumber) : 1;
        return {
          message: entry.message,
          severity: monaco.MarkerSeverity.Error,
          startLineNumber: entry.lineNumber,
          startColumn: entry.characterNumber,
          endLineNumber: entry.lineNumber,
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
    minimap: {
      enabled: false,
    },
    wordWrap: "on"
  };
  const language = currentFileCode?.identifier.endsWith("lexy") ? "yaml" : undefined;

  return <MonacoEditor language={language} theme={"lexy-theme"}
                       onChange={handleEditorChange} onMount={handleEditorDidMount}
                       options={options} />
}
