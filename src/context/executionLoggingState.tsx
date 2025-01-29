import {ExecutionLogEntry} from "lexy/dist/runTime/executionLogEntry";

export class ExecutionLoggingState {

  public readonly logging: ReadonlyArray<ExecutionLogEntry>;

  public constructor(logging: ReadonlyArray<ExecutionLogEntry> | null = null) {
    this.logging = logging === null ? [] : logging;
  }

  public setCurrent(logging: ReadonlyArray<ExecutionLogEntry>): ExecutionLoggingState {
    return new ExecutionLoggingState(logging);
  }

  public reset() {
    return new ExecutionLoggingState();
  }
}