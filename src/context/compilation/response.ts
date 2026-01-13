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

export type CompilationSuccessResponse = {
  readonly type: ResponseType.CompilationCompleted;
  readonly error: false;
  readonly logging: readonly LogModel[];
  readonly nodes: readonly NodeModel[];
  readonly elapsed: number;
}

export type CompilationFailedResponse = {
  readonly type: ResponseType.CompilationFailed;
  readonly error: true;
  readonly lastError: string;
}

export type RunScenariosResponse = {
  readonly type: ResponseType.RunScenariosCompleted;
  readonly result: readonly SpecificationsLogModel[],
};

export type RunFunctionSuccessResponse = {
  readonly type: ResponseType.RunFunctionCompleted;
  readonly error: false;
  readonly logging: readonly ExecutionLogModel[];
  readonly result: ResultsModel;
  readonly elapsed: number;
}

export type RunFunctionFailedResponse = {
  readonly type: ResponseType.RunFunctionCompleted;
  readonly error: true;
  readonly lastError: string;
}

export type CompilationCompletedResponse = CompilationSuccessResponse | CompilationFailedResponse;
export type RunFunctionCompletedResponse = RunFunctionSuccessResponse | RunFunctionFailedResponse;

export type Response = CompilationCompletedResponse | RunScenariosResponse | RunFunctionCompletedResponse;
