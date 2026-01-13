import React, {useEffect} from "react";
import {ComponentProps} from "../../infrastructure/componentProps";
import {CompilationContextState, useCompilationContext} from "./context";

export function HandleRunFunction({children}: ComponentProps) {

  const {
    runFunctionCompleted,
    setExecuteFunction,
    setExecutionLogging,
  }: CompilationContextState = useCompilationContext();

  useEffect(() => {

    console.log('Handle RunFunction: ', runFunctionCompleted);

    if (!runFunctionCompleted) return;

    if (!runFunctionCompleted.error) {
      setExecuteFunction(state => state.setResults(runFunctionCompleted.result, runFunctionCompleted.elapsed));
      setExecutionLogging(state => state.setCurrent(runFunctionCompleted.logging));
    } else {
      setExecuteFunction(state => state.setError(runFunctionCompleted.error.toString()));
      setExecutionLogging(state => state.reset());
    }
  }, [runFunctionCompleted]);

  return <>{children}</>;
}
