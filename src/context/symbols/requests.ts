import {Range, Position} from "../position";
import {timestamp} from "../../infrastructure/timestamp";
import {Nothing} from "../../infrastructure/nothing";

export enum RequestType {
  CreateSymbols,
  GetSignatures,
  GetCompletionItems
}

export type CreateSymbols = {
  readonly type: RequestType.CreateSymbols;
  readonly messageId: string | Nothing;
  readonly versionId: number;
  readonly fullFilePath: string;
  readonly code: string;
}

export type GetSignatures = {
  readonly type: RequestType.GetSignatures;
  readonly messageId: string;
  readonly fullFilePath: string,
  readonly versionId: number;
  readonly position: Position;
}

export type GetCompletionItems = {
  readonly type: RequestType.GetCompletionItems;
  readonly messageId: string;
  readonly fullFilePath: string,
  readonly versionId: number;
  readonly position: Position;
}

export type Request = CreateSymbols | GetSignatures | GetCompletionItems;

export function newMessageId() {
  const random = Math.round(Math.random() * 1000000)
  return timestamp() + "-" + random;
}
