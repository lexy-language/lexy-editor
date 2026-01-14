import React, {useEffect} from "react";
import {ComponentProps} from "../../infrastructure/componentProps";
import {CompilationContextState, useCompilationContext} from "./context";

export function HandleRunScenariosCompleted({children}: ComponentProps) {

  const {setTestingLogging, runScenariosCompleted}: CompilationContextState = useCompilationContext();

  useEffect(() => {
    console.log('Handle RunScenariosCompleted:', runScenariosCompleted);
    if (runScenariosCompleted) {
      setTestingLogging(() => runScenariosCompleted.result)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runScenariosCompleted]);

  return <>{children}</>;
}
