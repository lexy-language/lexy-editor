import React, {useEffect, useState} from "react";
import {nothing, Nothing} from "../../infrastructure/nothing";
import createContext from "../createContext";
import {ComponentProps} from "../../infrastructure/componentProps";
import {EditorProviders} from "./providers/editorProviders";
import {ProjectContextState, useProjectContext} from "../project/context";
import {isLoading} from "../loading";
import {SymbolsWorker} from "./worker";

export interface SymbolContextState {
  editorProviders: EditorProviders | Nothing;
}

export const [useSymbolsContext, Provider] = createContext<SymbolContextState>();

export const SymbolsContextProvider = ({children}: ComponentProps) => {

  const [worker] = useState<SymbolsWorker | Nothing>(() => new SymbolsWorker());
  const [editorProviders, setEditorsProviders] = useState<EditorProviders | Nothing>(nothing);

  const {currentFileCode}: ProjectContextState  = useProjectContext();

  function getFullFilePath(identifier: string) {
    return "/" + identifier.replaceAll("|", "/");
  }

  useEffect(() => {
    if (worker) {
      setEditorsProviders(new EditorProviders(worker));
    }
  }, [worker]);

  useEffect(() => {
    if (!currentFileCode || isLoading(currentFileCode)) return;

    const fullFilePath = getFullFilePath(currentFileCode.identifier);
    if (editorProviders) {
      editorProviders.setFullFilePath(fullFilePath);
    }
    if (worker) {
      worker.createSymbols(fullFilePath, currentFileCode.versionId, currentFileCode.code);
    }
  }, [currentFileCode]);

  const state = {
    editorProviders
  };

  return (
    <Provider value={state}>
      {children}
    </Provider>
  );
};
