import React, {useEffect} from "react";
import {nothing} from "../../infrastructure/nothing";
import {CompilationFailedResponse, ResponseType} from "./response";
import {LogModel} from "../project/logModel";
import {isLoading} from "../loading";
import {where} from "lexy/dist/infrastructure/arrayFunctions";
import {ComponentProps} from "../../infrastructure/componentProps";
import {ProjectContextState, useProjectContext} from "../project/context";
import {useCompilationContext} from "./context";

export function HandleCompilationComplete({children}: ComponentProps) {

  const {
    currentFileCode,
    setCurrentFileLogging,
    setNodes,
    setCurrentNode,
  }: ProjectContextState = useProjectContext();
  const {compilationCompleted} = useCompilationContext();

  function emptyCurrentFileState() {
    setNodes([]);
    setCurrentNode(nothing);
  }

  useEffect(() => {
    console.log('Handle CompilationCompleted:', compilationCompleted);

    function newLogModel(isError: boolean, fileName: string, message: string): LogModel {
      return {
        fileName: fileName,
        lineNumber: 1,
        characterNumber: 1,
        sortIndex: "_",
        isError: isError,
        message: message
      };
    }

    function errorOrSuccessful(logging: readonly LogModel[], elapsed: number): readonly LogModel[] {
      const fileName = !isLoading(currentFileCode) && currentFileCode?.name !== undefined ? currentFileCode.name : "untitled";
      const errors = where(logging, entry => entry.isError);
      if (errors.length === 0) {
        return [newLogModel(false, fileName, `Compilation successful: ${fileName} (${elapsed}ms)`)];
      }
      errors.push(newLogModel(true, fileName, `Compilation failed: ${fileName} (${elapsed}ms)`));
      return errors;
    }

    function setError(error: CompilationFailedResponse) {
      setCurrentFileLogging([newLogModel(true, "parsing", "Parsing error occurred:" + error.lastError)]);
      emptyCurrentFileState();
    }

    if (!compilationCompleted) return;

    if (compilationCompleted.type == ResponseType.CompilationFailed) {
      setError(compilationCompleted as CompilationFailedResponse);
      return;
    }

    const {logging, elapsed, nodes} = compilationCompleted;

    setCurrentFileLogging(errorOrSuccessful(logging, elapsed));
    setNodes(nodes);
    setCurrentNode(nothing);
  }, [compilationCompleted]);

  return <>{children}</>;
}
