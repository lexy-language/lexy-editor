import {nothing, Nothing} from "../../infrastructure/nothing";
import {ExecutionLogModel, mapExecutionLogging} from "./executionLogModel";
import {SpecificationsLogEntry} from "lexy/dist/specifications/specificationsLogEntry";

export type SpecificationsLogModel = {
  readonly nodeName: string | Nothing;
  readonly characterNumber: number | Nothing;
  readonly lineNumber: number | Nothing;
  readonly fileName: string | Nothing;
  readonly isError: boolean;
  readonly message: string;
  readonly errors: Array<string> | null;
  readonly executionLogging: readonly ExecutionLogModel[] | Nothing;
}

function mapSpecificationsLogModel(result: SpecificationsLogEntry): SpecificationsLogModel {
  return {
    nodeName: result.node ? result.node.nodeName : nothing,
    characterNumber: result.reference ? result.reference.characterNumber : nothing,
    lineNumber: result.reference ? result.reference.lineNumber : nothing,
    fileName: result.reference?.file ? result.reference.file.fileName : nothing,
    isError: result.isError,
    message: result.message,
    errors: result.errors,
    executionLogging: result.executionLogging ? mapExecutionLogging(result.executionLogging) : nothing
  }
}

export function mapSpecificationsLog(result: readonly SpecificationsLogEntry[]): readonly SpecificationsLogModel[] {
  return result.map(mapSpecificationsLogModel);
}
