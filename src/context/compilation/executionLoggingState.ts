import {ExecutionLogModel} from "./executionLogModel";

export class ExecutionLoggingState {

  public readonly logging: readonly ExecutionLogModel[];

  public constructor(logging: readonly ExecutionLogModel[] | null = null) {
    this.logging = logging === null ? [] : logging;
  }

  public setCurrent(logging: readonly ExecutionLogModel[]): ExecutionLoggingState {
    return new ExecutionLoggingState(logging);
  }

  public reset() {
    return new ExecutionLoggingState();
  }
}
