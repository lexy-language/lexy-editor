import React, {useEffect, useState} from "react";
import {nothing, Nothing} from "../../infrastructure/nothing";
import {
  Response,
  SymbolsCompletedResponse,
  SignaturesCompletedResponse,
  CompletionItemsCompletedResponse,
  ResponseType,
} from "./response";
import {
  Request,
  CreateSymbolsRequest,
  GetSignaturesRequest,
  GetCompletionItemsRequest,
  RequestType,
} from "./requests";
import createContext from "../createContext";
import {ComponentProps} from "../../infrastructure/componentProps";
import {EditorProviders} from "./editorProviders";
import {ProjectContextState, useProjectContext} from "../project/context";
import {isLoading} from "../loading";
import {CreateSymbolsTrigger, GetCompletionTrigger, GetSignaturesTrigger} from "./triggers";

export interface SymbolContextState {

  symbolsCompleted: SymbolsCompletedResponse | Nothing;
  signaturesCompleted: SignaturesCompletedResponse | Nothing;
  completionItemsCompleted: CompletionItemsCompletedResponse | Nothing;

  editorProviders: EditorProviders;
}

export const [useSymbolsContext, Provider] = createContext<SymbolContextState>();

export const SymbolsContextProvider = ({children}: ComponentProps) => {

  const [worker, setWorker] = useState<Worker | Nothing>();
  const [createSymbolsTrigger, setCreateSymbolsTrigger] = useState<CreateSymbolsTrigger | Nothing>(nothing);
  const [getSignaturesTrigger, setGetSignaturesTrigger] = useState<GetSignaturesTrigger | Nothing>(nothing);
  const [getCompletionItemsTrigger, setGetCompletionItemsTrigger] = useState<GetCompletionTrigger | Nothing>(nothing);
  const [symbolsCompleted, setSymbolsCompleted] = useState<SymbolsCompletedResponse | Nothing>(nothing);
  const [signaturesCompleted, setSignaturesCompleted] = useState<SignaturesCompletedResponse | Nothing>(nothing);
  const [completionItemsCompleted, setCompletionItemsCompleted] = useState<CompletionItemsCompletedResponse | Nothing>(nothing);
  const [editorProviders] = useState<EditorProviders>(new EditorProviders(setCreateSymbolsTrigger, setGetSignaturesTrigger, setGetCompletionItemsTrigger));

  const {currentFileCode}: ProjectContextState  = useProjectContext();

  function handleResponse(response: MessageEvent<Response>) {
    if (response.data.type === ResponseType.SymbolsCompleted) {
      setSymbolsCompleted(response.data as SymbolsCompletedResponse);
    } else if (response.data.type === ResponseType.SignaturesCompleted) {
      setSignaturesCompleted(response.data as SignaturesCompletedResponse);
    } else if (response.data.type === ResponseType.CompletionItemsCompleted) {
      setCompletionItemsCompleted(response.data as CompletionItemsCompletedResponse);
    } else {
      console.log(`Error: Unknown message: ${JSON.stringify(response.data)}`);
    }
  }

  function createOrStopWorker() {
    if (worker != null) {
      return worker;
    }

    const newWorker = new Worker(new URL('./background/worker.ts', import.meta.url));
    newWorker.onmessage = handleResponse;
    setWorker(newWorker);
    return newWorker
  }

  function postRequest(request: Request) {
    let worker = createOrStopWorker();
    worker.postMessage(request);
  }

  useEffect(() => {

    if (!createSymbolsTrigger || !currentFileCode || isLoading(currentFileCode)) return;

    if (currentFileCode.versionId != createSymbolsTrigger.versionId) {
      return console.log(`ERROR: createSymbolsTrigger version ID doesn't match: ${createSymbolsTrigger.versionId} != ${currentFileCode.versionId}`)
    }

    const currentFolder = currentFileCode.identifier.split("|");
    const request: CreateSymbolsRequest = {
      type: RequestType.CreateSymbols,
      fileName: currentFileCode.name,
      versionId: currentFileCode.versionId,
      folder: currentFolder,
    };
    postRequest(request);
  }, [createSymbolsTrigger, currentFileCode]);

  useEffect(() => {
    if (!getSignaturesTrigger || !currentFileCode || isLoading(currentFileCode)) return;
    const request: GetSignaturesRequest = {
      type: RequestType.GetSignatures,
      fileName: currentFileCode.name,
      versionId: getSignaturesTrigger.versionId,
      position: getSignaturesTrigger.position
    };
    postRequest(request);
  }, [getSignaturesTrigger]);

  useEffect(() => {
    if (!getCompletionItemsTrigger || !currentFileCode || isLoading(currentFileCode)) return;
    const request: GetCompletionItemsRequest = {
      type: RequestType.GetCompletionItems,
      fileName: currentFileCode.name,
      versionId: getCompletionItemsTrigger.versionId,
      position: getCompletionItemsTrigger.position
    };
    postRequest(request);
  }, [getCompletionItemsTrigger]);

  const state = {
    createSymbolsTrigger, setCreateSymbolsTrigger,
    getSignaturesTrigger, setGetSignaturesTrigger,
    getCompletionItemsTrigger, setGetCompletionItemsTrigger,
    symbolsCompleted,
    signaturesCompleted,
    completionItemsCompleted,
    editorProviders
  };

  return (
    <Provider value={state}>
      {children}
    </Provider>
  );
};
