import {NodeModel} from "../project/nodeModel";
import {LogModel} from "../project/logModel";
import {ResultsModel} from "./resultsModel";
import {ExecutionLogModel} from "./executionLogModel";
import {SpecificationsLogModel} from "./specificationsLogModel";

export enum ResponseType {
  CompilationCompleted,
  CompilationFailed,
  RunFunctionCompleted,
  RunScenariosCompleted
}

export type CompilationSuccess = {
  readonly type: ResponseType.CompilationCompleted;
  readonly error: false;
  readonly logging: readonly LogModel[];
  readonly nodes: readonly NodeModel[];
  readonly elapsed: number;
}

export type CompilationFailed = {
  readonly type: ResponseType.CompilationFailed;
  readonly error: true;
  readonly lastError: string;
}

export type RunScenarios = {
  readonly type: ResponseType.RunScenariosCompleted;
  readonly result: readonly SpecificationsLogModel[],
};

export type RunFunctionSuccess = {
  readonly type: ResponseType.RunFunctionCompleted;
  readonly error: false;
  readonly logging: readonly ExecutionLogModel[];
  readonly result: ResultsModel;
  readonly elapsed: number;
}

export type RunFunctionFailed = {
  readonly type: ResponseType.RunFunctionCompleted;
  readonly error: true;
  readonly lastError: string;
}

export type CompilationCompleted = CompilationSuccess | CompilationFailed;
export type RunFunctionCompleted = RunFunctionSuccess | RunFunctionFailed;

export type Response = CompilationCompleted | RunScenarios | RunFunctionCompleted;
