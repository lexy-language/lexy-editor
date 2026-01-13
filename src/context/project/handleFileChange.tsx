import {isLoading} from "../loading";
import {useDebounce} from "../../infrastructure/useDebounce";
import React, {useEffect, useState} from "react";
import {nothing} from "../../infrastructure/nothing";
import {useCodeFileStorage} from "../../api/codeStorage";
import {ComponentProps} from "../../infrastructure/componentProps";
import {ProjectContextState, useProjectContext} from "./context";
import {CompilationContextState, useCompilationContext} from "../compilation/context";

export function HandleFileChange({children}: ComponentProps) {

  const {
    currentProject,
    currentFile,
    currentFileCode,
    setCurrentFileCode,
    setCurrentFileLogging,
    setNodeTreeState,
    setCurrentNode,
  }: ProjectContextState  = useProjectContext();
  const {setExecuteFunction, setExecutionLogging}: CompilationContextState  = useCompilationContext();

  const {storeCodeFile, getCodeFile} = useCodeFileStorage();
  const {startCompilation} = useCompilationContext();
  const [lastCode, setLastCode] = useState<string | null>(null);

  function emptyCurrentFileState() {
    setCurrentNode(nothing);
    setNodeTreeState(state => state.reset());
  }

  const debounceValue = useDebounce(currentFileCode, 500);

  useEffect(() => {

    if (!currentFileCode || isLoading(currentFileCode)) {
      setCurrentFileLogging([]);
      emptyCurrentFileState();
      return;
    }

    if (lastCode == currentFileCode.code) return;
    setLastCode(currentFileCode.code);

    const currentFolder = currentFileCode.identifier.split("|");
    currentFolder.splice(currentFolder.length - 1, 1);
    if (currentFileCode.source === "editor") {
      storeCodeFile(currentFileCode.identifier, currentFileCode.code, true)
        .then(() => {
          startCompilation(currentFolder, currentFileCode.name, currentFileCode.code);
        });
    } else {
      startCompilation(currentFolder, currentFileCode.name, currentFileCode.code);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);

  useEffect(() => {

    function setCodeFile(identifier: string, code: string, name: string) {
      const currentFileCode = {
        code: code,
        identifier: identifier,
        name: name,
        source: "state"
      };
      setCurrentFileCode(currentFileCode);
    }

    if (!currentFile) {
      setCurrentFileCode(nothing);
      return;
    }

    setExecuteFunction(executeFunction => executeFunction.reset());
    setExecutionLogging(executionLogging => executionLogging.reset());

    getCodeFile(currentFile.identifier)
      .then(value => {
        if (value != null) {
          setCodeFile(currentFile.identifier, value, currentFile.name);
        }
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProject.name, currentFile]);

  return <>{children}</>;
}
