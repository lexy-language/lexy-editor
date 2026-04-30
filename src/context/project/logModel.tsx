import {LogEntry} from "lexy/dist/parser/logging/parserLogger";

export interface LogModel {
  readonly fileName: string;
  readonly lineNumber: number;
  readonly characterNumber: number;
  readonly sortIndex: string;
  readonly isError: boolean;
  readonly message: string;
}

export function mapLogging(logging: LogEntry[]): LogModel[] {
  return logging.map(mapLogEntry);
}

export function mapLogEntry(entry: LogEntry): LogModel {
  return {
    fileName: entry.reference.file.name,
    lineNumber: entry.reference.lineNumber,
    characterNumber: entry.reference.column,
    sortIndex: entry.sortIndex,
    isError: entry.isError,
    message: entry.message
  };
}
