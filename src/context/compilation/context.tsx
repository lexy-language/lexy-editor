import React, {useState} from "react";
import {nothing, Nothing} from "../../infrastructure/nothing";
import {
  Response,
  CompilationCompletedResponse,
  RunFunctionCompletedResponse,
  ResponseType,
  CompilationSuccessResponse,
  RunScenariosResponse
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
import {Loading, loading} from "../loading";
import {useProjectContext} from "../project/context";
import {HandleRunScenariosCompleted} from "./handleRunScenariosCompleted";
import {SpecificationsLogModel} from "./specificationsLogModel";
import {useOperationStateStorage} from "../../api/operationStorage";
import {timestamp} from "../../infrastructure/timestamp";
import {operationKey} from "./worker";

export interface CompilationContextState {
  startCompilation(folder: string[], filename: string, code: string): Promise<void>;
  compilationCompleted: CompilationCompletedResponse | Nothing;
  runScenariosCompleted: RunScenariosResponse | Nothing,

  runFunction(folder: string[], filename: string, functionName: string, parameters: ParametersModel): void;
  runFunctionCompleted: RunFunctionCompletedResponse | Nothing;

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
  const [compilationCompleted, setCompilationCompleted] = useState<CompilationCompletedResponse | Nothing>(nothing);
  const [runFunctionCompleted, setRunFunctionCompleted] = useState<RunFunctionCompletedResponse | Nothing>(nothing);
  const [runScenariosCompleted, setRunScenariosCompleted] = useState<RunScenariosResponse | Nothing>(nothing);

  const [executeFunction, setExecuteFunction] = useState<ExecuteFunctionState>(new ExecuteFunctionState());
  const [executionLogging, setExecutionLogging] = useState<ExecutionLoggingState>(new ExecutionLoggingState());
  const [executionLoggingTreeState, setExecutionLoggingTreeState] = useState<TreeNodeState>(new TreeNodeState());

  const [testingLogging, setTestingLogging] = useState<(readonly SpecificationsLogModel[]) | Loading>([]);

  const {setNodes, setCurrentNode} = useProjectContext();
  const {updateOperationState} = useOperationStateStorage();

  function handleResponse(response: MessageEvent<Response>) {
    if (response.data.type == ResponseType.CompilationCompleted) {
      setCompilationCompleted(response.data as CompilationSuccessResponse);
    } else if (response.data.type == ResponseType.RunScenariosCompleted) {
      setRunScenariosCompleted(response.data as RunScenariosResponse);
    } else if (response.data.type == ResponseType.RunFunctionCompleted) {
      setRunFunctionCompleted(response.data as RunFunctionCompletedResponse);
    } else {
      console.log(`Error: Unknown message: ${JSON.stringify(response.data)}`);
    }
  }

  function createOrStopWorker() {
    if (worker != null) {
      return worker;
    }

    const newWorker = new Worker(new URL('./worker.ts', import.meta.url));
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
