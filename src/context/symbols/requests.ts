import {Position} from "monaco-editor";

export enum RequestType {
  CreateSymbols,
  GetSignatures,
  GetCompletionItems
}

export type CreateSymbolsRequest = {
  readonly type: RequestType.CreateSymbols;
  readonly versionId: number;
  readonly folder: string[];
  readonly fileName: string,
}

export type GetSignaturesRequest = {
  readonly type: RequestType.GetSignatures;
  readonly fileName: string,
  readonly versionId: number;
  readonly position: Position;
}

export type GetCompletionItemsRequest = {
  readonly type: RequestType.GetCompletionItems;
  readonly fileName: string,
  readonly versionId: number;
  readonly position: Position;
}

export type Request = CreateSymbolsRequest | GetSignaturesRequest | GetCompletionItemsRequest;
