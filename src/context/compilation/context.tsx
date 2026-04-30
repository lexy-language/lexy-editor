import React, {useState} from "react";
import {nothing, Nothing} from "../../infrastructure/nothing";
import {
  Response,
  CompilationCompleted,
  RunFunctionCompleted,
  ResponseType,
  CompilationSuccess,
  RunScenarios, CompilationFailed
} from "./response";
import {Request, StartCompilationRequest, RunFunctionRequest, RequestType} from "./requests";
import createContext from "../createContext";
import {ComponentProps} from "../../infrastructure/componentProps";
import {HandleCompilationComplete} from "./handleCompilateComplete";
import {HandleRunFunction} from "./handleRunFunction";
import {ExecuteFunctionState} from "./executeFunctionState";
import {ExecutionLoggingState} from "./executionLoggingState";
import {TreeNodeState} from "../treeNodeState";
import {ParametersModel} from "./resultsModel";
import {isLoading, Loading, loading} from "../loading";
import {ProjectContextState, useProjectContext} from "../project/context";
import {HandleRunScenariosCompleted} from "./handleRunScenariosCompleted";
import {SpecificationsLogModel} from "./specificationsLogModel";
import {useOperationStateStorage} from "../../api/operationStorage";
import {timestamp} from "../../infrastructure/timestamp";
import {LogModel} from "../project/logModel";

export const operationKey = "compilation-worker";

export interface CompilationContextState {
  startCompilation(folder: string[], filename: string, code: string): Promise<void>;
  compilationCompleted: CompilationCompleted | Nothing;
  runScenariosCompleted: RunScenarios | Nothing,

  runFunction(folder: string[], filename: string, functionName: string, parameters: ParametersModel): void;
  runFunctionCompleted: RunFunctionCompleted | Nothing;

  executeFunction: ExecuteFunctionState;
  setExecuteFunction: React.Dispatch<React.SetStateAction<ExecuteFunctionState>>;

  executionLoggingTreeState: TreeNodeState;
  setExecutionLoggingTreeState: React.Dispatch<React.SetStateAction<TreeNodeState>>;

  executionLogging: ExecutionLoggingState;
  setExecutionLogging: React.Dispatch<React.SetStateAction<ExecutionLoggingState>>;

  testingLogging: readonly SpecificationsLogModel[] | Loading;
  setTestingLogging: React.Dispatch<React.SetStateAction<readonly SpecificationsLogModel[] | Loading>>;
}

export const [useCompilationContext, Provider] = createContext<CompilationContextState>();

export const CompilationContextProvider = ({children}: ComponentProps) => {

  const [worker, setWorker] = useState<Worker | Nothing>();
  const [compilationCompleted, setCompilationCompleted] = useState<CompilationCompleted | Nothing>(nothing);
  const [runFunctionCompleted, setRunFunctionCompleted] = useState<RunFunctionCompleted | Nothing>(nothing);
  const [runScenariosCompleted, setRunScenariosCompleted] = useState<RunScenarios | Nothing>(nothing);

  const [executeFunction, setExecuteFunction] = useState<ExecuteFunctionState>(new ExecuteFunctionState());
  const [executionLogging, setExecutionLogging] = useState<ExecutionLoggingState>(new ExecutionLoggingState());
  const [executionLoggingTreeState, setExecutionLoggingTreeState] = useState<TreeNodeState>(new TreeNodeState());

  const [testingLogging, setTestingLogging] = useState<(readonly SpecificationsLogModel[]) | Loading>([]);

  const {setNodes, currentFileCode, setCurrentFileLogging, setCurrentNode}: ProjectContextState = useProjectContext();
  const {updateOperationState} = useOperationStateStorage();

  function addCompilationFailedLogging(response: CompilationFailed) {
    setCurrentFileLogging(state => {
      const logItem: LogModel = {
        fileName: !currentFileCode || isLoading(currentFileCode) || !currentFileCode.name ? "" : currentFileCode.name,
        lineNumber: 1,
        characterNumber: 1,
        sortIndex: "_",
        isError: true,
        message: "Compilation failed: " + response.lastError
      };
      return isLoading(state) ? [logItem] : [logItem, ...state];
    });
  }

  function handleResponse(response: MessageEvent<Response>) {
    if (response.data.type === ResponseType.CompilationCompleted) {
      setCompilationCompleted(response.data as CompilationSuccess);
    } else if (response.data.type === ResponseType.CompilationFailed) {
      addCompilationFailedLogging(response.data as CompilationFailed);
    } else if (response.data.type === ResponseType.RunScenariosCompleted) {
      setRunScenariosCompleted(response.data as RunScenarios);
    } else if (response.data.type === ResponseType.RunFunctionCompleted) {
      setRunFunctionCompleted(response.data as RunFunctionCompleted);
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

  async function stopCurrent(): Promise<string> {
    const operationTimestamp = timestamp();
    await updateOperationState(operationKey, operationTimestamp);
    return operationTimestamp;
  }

  async function startCompilation(folder: string[], filename: string, code: string): Promise<void> {

    setNodes(loading);
    setTestingLogging(loading);
    setCurrentNode(nothing);

    const timestamp = await stopCurrent();
    const request: StartCompilationRequest = {
      type: RequestType.StartCompilation,
      folder: folder,
      fileName: filename,
      code: code,
      timestamp: timestamp
    };
    postRequest(request);
  }

  function runFunction(foler: string[], fileName: string, functionName: string, parameters: ParametersModel) {
    setExecuteFunction(state => state.setLoading(true));
    const request: RunFunctionRequest = {
      type: RequestType.RunFunction,
      folder: foler,
      fileName: fileName,
      functionName: functionName,
      parameters: parameters
    };
    postRequest(request);
  }

  function postRequest(request: Request) {
    let worker = createOrStopWorker();
    worker.postMessage(request);
  }

  const state = {
    startCompilation,
    runFunction,
    compilationCompleted,
    runScenariosCompleted,
    runFunctionCompleted,
    executeFunction, setExecuteFunction,
    executionLogging, setExecutionLogging,
    executionLoggingTreeState, setExecutionLoggingTreeState,
    testingLogging, setTestingLogging,
  };

  return (
    <Provider value={state}>
      {children}
    </Provider>
  );
};

export const CompilationHandlers = [HandleCompilationComplete, HandleRunFunction, HandleRunScenariosCompleted];
