import {ILogger, LogLevel} from "lexy";

export class DummyLogger implements ILogger {

  isEnabled(level: LogLevel): boolean {
    return false;
  }

  logDebug(message: string): void {
  }

  logError(message: string): void {
  }

  logInformation(message: string): void {
  }
}

export type MemoryLogEntry = {
  message: string,
  level: LogLevel,
}

export class MemoryLogger implements ILogger {

  private loggingValue: Array<MemoryLogEntry> = [];

  public get logging(): ReadonlyArray<MemoryLogEntry> {
    return this.loggingValue;
  }

  isEnabled(level: LogLevel): boolean {
    return true;
  }

  logDebug(message: string): void {
    this.loggingValue.push({message: message, level: LogLevel.Debug});
  }

  logError(message: string): void {
    this.loggingValue.push({message: message, level: LogLevel.Error});
  }

  logInformation(message: string): void {
    this.loggingValue.push({message: message, level: LogLevel.Information});
  }
}