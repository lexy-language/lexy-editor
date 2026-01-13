import {ParametersModel} from "./resultsModel";

export enum RequestType {
  StartCompilation,
  RunFunction
}

export type StartCompilationRequest = {
  readonly type: RequestType.StartCompilation;
  readonly folder: string[];
  readonly fileName: string;
  readonly code: string;
  readonly timestamp: string;
}

export type RunFunctionRequest = {
  readonly type: RequestType.RunFunction;
  readonly folder: string[];
  readonly fileName: string;
  readonly functionName: string;
  readonly parameters: ParametersModel;
}

export type Request = StartCompilationRequest | RunFunctionRequest;
