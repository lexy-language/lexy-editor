import React, {useEffect} from "react";
import {ComponentProps} from "../../infrastructure/componentProps";
import {ProjectContextState, useProjectContext} from "./context";
import {CompilationContextState, useCompilationContext} from "../compilation/context";

export function HandleNodeChange({children}: ComponentProps) {

  const {currentNode}: ProjectContextState = useProjectContext();
  const {setExecuteFunction}: CompilationContextState = useCompilationContext();

  useEffect(() => {
    setExecuteFunction(executeFunction => executeFunction.reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNode])

  return <>{children}</>;
}
