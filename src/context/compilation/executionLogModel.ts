import {LogVariables} from "lexy/dist/runTime/executionContext";
import {ExecutionLogEntry} from "lexy/dist/runTime/executionLogEntry";
import {Nothing} from "../../infrastructure/nothing";

export type LogVariableModel = Date | string | number | boolean | LogVariables;

export type LogVariablesModel = {
  [key: string]: LogVariableModel;
};

export interface ExecutionLogModel {
  readonly message: string;
  readonly readVariables: LogVariablesModel;
  readonly writeVariables: LogVariablesModel | Nothing;
  readonly entries: readonly ExecutionLogModel[];
}

function mapExecutionLog(entry: ExecutionLogEntry): ExecutionLogModel {
  return {
    message: entry.message,
    readVariables: entry.readVariables,
    writeVariables: entry.writeVariables,
    entries: mapExecutionLogging(entry.entries)
  };
}

export function mapExecutionLogging(entries: readonly ExecutionLogEntry[]): ExecutionLogModel[] {
  return entries.map(mapExecutionLog);
}
